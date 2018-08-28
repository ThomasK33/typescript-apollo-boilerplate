---
inject: true
to: src/graphql/graphql.ts
after: "directiveResolvers: \\{"
---
		<%=directive%>: <%=directive%>Directive,