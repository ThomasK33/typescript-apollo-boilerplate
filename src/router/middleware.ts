import { Request } from "express";

import { schema } from "@src/graphql/graphql";
import { ApolloServer } from "apollo-server-express";
import { env } from "graphql/helper";
import { verify } from "jsonwebtoken";

export const onConnect = async (header: any, _webSocket: any, _context: any) => {
	let jwt = "";

	if (header != null && header.Authorization != null) {
		jwt = header.Authorization.split("Bearer ")[1];
	} else {
		return {};
	}

	const payload: any = await new Promise(
		(resolve, reject) => verify(
			jwt,
			env("JWT_SECRET", "JWT_SECRET"),
			(err: any, data: any) => err ? reject(err) : resolve({ user: data }),
		),
	);

	return payload;
};

export const context = async ({ req, connection }: { req: Request, connection: any }) => {
	const resultingContext: IContext = {};

	if (connection != null) {
		resultingContext.user = connection.context.user;
	} else {
		/* istanbul ignore else */
		if (req.headers.authorization != null) {
			const jwt = req.headers.authorization.split("Bearer ")[1];

			const payload: any = await new Promise(
				(resolve, reject) => verify(
					jwt,
					env("JWT_SECRET", "JWT_SECRET"),
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
	debug: env("NODE_ENV", "development") !== "production",
	tracing: env("NODE_ENV", "development") !== "production",
	introspection: true,
	playground: true,
	subscriptions: {
		path: "/graphql",
		onConnect,
	},
});
