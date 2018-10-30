import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

// Type def imports
import baseTypeDef from "./base/baseTypeDef";

// Resolver imports
import baseResolver from "./base/baseResolver";

// Directive imports

export const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [
		baseTypeDef,
	],
	resolvers: [
		baseResolver,
	],
	schemaDirectives: {
	},
	directiveResolvers: {
	},
});
