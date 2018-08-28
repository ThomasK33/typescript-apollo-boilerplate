import { GraphQLResolveInfo } from "graphql";
import { pubSub } from "./pubsub";

import packageJSON = require("@root/package.json");

export default {
	Query: {
		version: (rootValue: any, args: any, context: any, info: GraphQLResolveInfo) => packageJSON.version || "1.0.0",
	},
	Mutation: {
		_base_: (rootValue: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) => {

			pubSub.publish("_base_", {
				_base_: "_base_ --- " + (new Date()).toString(),
			});

			return "_base_";
		},
	},
	Subscription: {
		_base_: {
			subscribe: () => pubSub.asyncIterator("_base_"),
		},
	},
};
