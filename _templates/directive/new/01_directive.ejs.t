---
to: src/gql/directives/<%=directive%>Directive.ts
---

import { GraphQLResolveInfo } from "graphql";
import { NextResolverFn } from "graphql-tools";

export default (
	next: NextResolverFn,
	src: any,
	args: { [argName: string]: any; },
	context: any,
	info: GraphQLResolveInfo) => {

	return next();
};
