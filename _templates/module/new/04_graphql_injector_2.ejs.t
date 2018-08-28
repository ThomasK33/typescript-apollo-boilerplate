---
inject: true
to: src/graphql/graphql.ts
after: "Resolver imports"
---
import <%=module%>Resolver from "./modules/<%=module%>/<%=module%>Resolver";