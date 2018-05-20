import { Request } from "express";
import * as express_JWT from "express-jwt";

export const expressJWT = express_JWT({
	secret: process.env.JWT_SECRET || "",
	credentialsRequired: false,
	getToken: (req: Request) => {
		if (req.headers.authorization && ("" + req.headers.authorization).split(" ")[0] === "Bearer") {
			return ("" + req.headers.authorization).split(" ")[1];
		} else if (req.query && req.query.token) {
			return req.query.token;
		} else if (req.cookies && req.cookies.auth) {
			return req.cookies.auth;
		} else {
			return null;
		}
	},
});

import { schema } from "@src/gql/graphql";
import { ExpressHandler, graphqlExpress } from "apollo-server-express";

export const expressGraphql: ExpressHandler = graphqlExpress((req) => ({
	schema,
	context: { req, user: (req !== undefined ? req.user : undefined) },
	debug: process.env.PRODUCTION === "false",
	tracing: process.env.PRODUCTION === "false",
}));
