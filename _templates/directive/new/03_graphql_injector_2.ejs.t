---
inject: true
to: src/graphql/graphql.ts
after: "schemaDirectives: \\{"
---
		<%=directive%>: <%=directive%>Directive,