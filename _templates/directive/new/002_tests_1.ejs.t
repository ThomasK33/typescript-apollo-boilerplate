---
to: tests/directives/<%=directive%>/<%=directive%>Directive.spec.ts
---
import { expect } from "chai";
import "mocha";

const title = "<%=directive%>Directive";

// tslint:disable:no-unused-expression
describe(title, () => {
	it("should return", () => {
		expect(true).to.be.true;
	});
});
