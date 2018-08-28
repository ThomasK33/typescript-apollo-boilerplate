---
inject: true
to: tests/index.spec.ts
after: "resolvers"
---
require("@tests/modules/<%=module%>/<%=module%>Resolver.spec");