---
inject: true
to: src/graphql/graphql.ts
after: "Type def imports"
---
import <%=module%>TypeDef from "./modules/<%=module%>/<%=module%>TypeDef";