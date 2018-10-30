---
to: tests/directives/<%=directive%>/<%=directive%>Directive.spec.ts
---
import { expect } from "chai";
import "mocha";

import { closeStub, setupStub } from "@root/tests/helper";

import <%=directive%>Directive from "graphql/directives/<%=directive%>/<%=directive%>Directive";

const title = "<%=directive%>Directive";

// tslint:disable:no-unused-expression
describe(title, () => {
	before(() => {
		setupStub(title);
	});

	it("should return", () => {
		expect(true).to.be.true;

		expect(<%=directive%>Directive).to.not.be.null;
	});

	after(closeStub);
});
