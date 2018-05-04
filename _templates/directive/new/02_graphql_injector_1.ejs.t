---
inject: true
to: src/gql/graphql.ts
after: "Directive imports"
---
import <%=directive%>Directive from "./directives/<%=directive%>Directive";