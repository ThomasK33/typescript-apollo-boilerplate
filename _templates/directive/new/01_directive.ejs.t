---
to: src/graphql/directives/<%=directive%>/<%=directive%>Directive.ts
---

import { GraphQLEnumValue, GraphQLField } from "graphql";

import { SchemaDirectiveVisitor } from "graphql-tools";

export default class <%=directive%>Directive extends SchemaDirectiveVisitor {
	public visitFieldDefinition(field: GraphQLField<any, any>) {
		// TODO: Add directive field visitor
	}
}
