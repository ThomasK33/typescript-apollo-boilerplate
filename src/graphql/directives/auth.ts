import { injectable } from "inversify";
import { SchemaDirectiveVisitor } from "graphql-tools";
import { GraphQLObjectType, GraphQLField } from "graphql";

import { GQLDirective } from "@src/definitions/directive";
import { gql, ApolloError } from "apollo-server-express";
import { Context } from "@src/definitions/backend";

import { defaultFieldResolver } from "graphql";

interface AuthGraphQLObjectType extends GraphQLObjectType {
	_requiredAuthRole?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AuthGraphQLField<TSource, TContext, TArgs = { [key: string]: any }>
	extends GraphQLField<TSource, TContext, TArgs> {
	_requiredAuthRole?: string;
}

class AuthDirectiveVisitor<TArgs, TContext> extends SchemaDirectiveVisitor<
	TArgs & { requires: string },
	TContext
> {
	name = "auth";

	visitObject(type: AuthGraphQLObjectType): GraphQLObjectType | void | null {
		type._requiredAuthRole = this.args.requires;
		this.ensureFieldsWrapped(type);
	}
	// Visitor methods for nested types like fields and arguments
	// also receive a details object that provides information about
	// the parent and grandparent types.
	visitFieldDefinition(
		field: AuthGraphQLField<unknown, Context>,
		details: {
			objectType: AuthGraphQLObjectType;
		},
	): GraphQLField<unknown, Context> | void | null {
		field._requiredAuthRole = this.args.requires;
		this.ensureFieldsWrapped(details.objectType);
	}

	ensureFieldsWrapped(objectType: AuthGraphQLObjectType) {
		// Mark the GraphQLObjectType object to avoid re-wrapping:
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if ((objectType as any)._authFieldsWrapped) return;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(objectType as any)._authFieldsWrapped = true;

		const fields = objectType.getFields();

		Object.keys(fields).forEach((fieldName) => {
			const field: AuthGraphQLField<unknown, Context> = fields[fieldName];
			const { resolve = defaultFieldResolver } = field;
			field.resolve = async function (...args) {
				// Get the required Role from the field first, falling back
				// to the objectType if no Role is required by the field:

				const context: Context = args[2];
				const { user } = context;

				const requiredRole =
					field._requiredAuthRole || objectType._requiredAuthRole;

				if (!requiredRole) {
					return resolve.apply(this, args);
				}

				if (!user) {
					throw new ApolloError(
						"Not authenticated",
						"NOT_AUTHENTICATED",
					);
				}

				if (!user?.scope?.includes(requiredRole)) {
					throw new ApolloError("Not authorized", "NOT_AUTHORIZED");
				}

				return resolve.apply(this, args);
			};
		});
	}
}

@injectable()
export class AuthDirective implements GQLDirective {
	typeDef = gql`
		directive @auth(requires: SCOPE = ADMIN) on OBJECT | FIELD_DEFINITION

		enum SCOPE {
			ADMIN
			USER
			UNKNOWN
		}
	`;

	schemaVisitor = {
		auth: AuthDirectiveVisitor,
	};
}
