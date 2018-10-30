---
inject: true
to: src/graphql/graphql.ts
after: "Directive imports"
---
import <%=directive%>Directive from "./directives/<%=directive%>/<%=directive%>Directive";