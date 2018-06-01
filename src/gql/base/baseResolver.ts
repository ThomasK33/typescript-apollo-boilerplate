import { GraphQLResolveInfo } from "graphql";
import { pubSub } from "./pubsub";

export default {
	Query: {
		version: (rootValue: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) => "1.0.0",
	},
	Mutation: {
		_base_: (rootValue: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) => {

			pubSub.publish("_base_", {
				_base_: "_base_ --- " + (new Date()).toString(),
			});

			return "1.0.0";
		},
	},
	Subscription: {
		_base_: {
			subscribe: () => pubSub.asyncIterator("_base_"),
		},
	},
};
