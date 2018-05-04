import { GraphQLResolveInfo } from "graphql";
import { pubSub } from "./pubsub";

export default {
	Query: {
		version: (rootValue: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) => "1.0.0",
	},
	Mutation: {
		version: (rootValue: any, args: { [argName: string]: any; }, context: any, info: GraphQLResolveInfo) => {

			pubSub.publish("ping", {
				ping: "pong --- " + (new Date()).toString(),
			});

			return "1.0.0";
		},
	},
	Subscription: {
		ping: {
			subscribe: () => pubSub.asyncIterator("ping"),
		},
	},
};
