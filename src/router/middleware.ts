import { Request } from "express";

import { IContext } from "@src/definitions/definitions";
import { schema } from "@src/graphql/graphql";
import { ApolloServer } from "apollo-server-express";
import { verify } from "jsonwebtoken";

const onConnect = async (header: any, _webSocket: any, _context: any) => {
	let jwt = "";

	if (header != null && header.authorization != null) {
		jwt = header.authorization.split("Bearer ")[1];
	} else {
		return {};
	}

	const payload: any = await new Promise(
		(resolve, reject) => verify(
			jwt,
			process.env.JWT_SECRET || "",
			(err: any, data: any) => err ? reject(err) : resolve({ user: data }),
		),
	);

	return payload;
};

const context = async ({ req, connection }: { req: Request, connection: any }) => {
	const resultingContext: IContext = {};

	if (connection != null) {
		resultingContext.user = connection.context.user;
	} else {
		if (req.headers.authorization != null) {
			const jwt = req.headers.authorization.split("Bearer ")[1];

			const payload: any = await new Promise(
				(resolve, reject) => verify(
					jwt,
					process.env.JWT_SECRET || "",
					(err: any, data: any) => err ? reject(err) : resolve({ user: data }),
				),
			);

			resultingContext.user = payload.user;
		}
	}

	return resultingContext;
};

export const graphqlServer = new ApolloServer({
	schema,
	context,
	debug: process.env.PRODUCTION === "false",
	tracing: process.env.PRODUCTION === "false",
	introspection: true,
	playground: true,
	subscriptions: {
		path: "/graphql",
		onConnect,
	},
});
