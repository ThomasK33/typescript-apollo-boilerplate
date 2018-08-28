import { use } from "chai";
import chaiAsPromised = require("chai-as-promised");
import "mocha";

// Add promise support to chai
use(chaiAsPromised);

// In case of tests not stoping
// use: wtf.dump();
import wtf = require("wtfnode");
wtf.init();

const title = "index";

describe(title, () => {
	it("should pass first", () => {
		return true;
	});
});

// tslint:disable:no-var-requires

// directives

// resolvers
