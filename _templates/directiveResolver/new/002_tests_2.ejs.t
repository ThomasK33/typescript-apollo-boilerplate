---
inject: true
to: tests/index.spec.ts
after: "directives"
---
require("@tests/directives/<%=directive%>/<%=directive%>Directive.spec");