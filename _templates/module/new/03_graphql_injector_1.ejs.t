---
inject: true
to: src/gql/graphql.ts
after: "Type def imports"
---
import <%=module%>TypeDef from "./modules/<%=module%>/<%=module%>TypeDef";