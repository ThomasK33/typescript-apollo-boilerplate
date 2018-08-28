---
to: tests/modules/<%=module%>/<%=module%>Resolver.spec.ts
---
import { expect } from "chai";
import "mocha";

const title = "<%=module%>";

// tslint:disable:no-unused-expression
describe(title, () => {
	describe("Query", () => {
		it("should return", () => {
			expect(true).to.be.true;
		});
	});
	
	describe("Mutation", () => {
		it("should return", () => {
			expect(true).to.be.true;
		});
	});
	
	describe("Subscription", () => {
		it("should return", () => {
			expect(true).to.be.true;
		});
	});
});
