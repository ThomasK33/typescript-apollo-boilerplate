---
inject: true
to: src/gql/graphql.ts
after: "directiveResolvers: \\{"
---
		<%=directive%>: <%=directive%>Directive,