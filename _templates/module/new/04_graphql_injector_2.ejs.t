---
inject: true
to: src/gql/graphql.ts
after: "Resolver imports"
---
import <%=module%>Resolver from "./modules/<%=module%>/<%=module%>Resolver";