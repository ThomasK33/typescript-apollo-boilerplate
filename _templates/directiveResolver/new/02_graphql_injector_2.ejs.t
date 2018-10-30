---
inject: true
to: src/graphql/graphql.ts
after: "Type def imports"
---
import <%=directive%>TypeDef from "./directives/<%=directive%>/<%=directive%>TypeDef";