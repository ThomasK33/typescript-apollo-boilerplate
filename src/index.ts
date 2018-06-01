import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
dotenvExpand(dotenv.config());

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as debug from "debug";
import * as express from "express";
import * as helmet from "helmet";
import { Server } from "http";

import authRouter from "@src/router/auth";
import { expressGraphql, expressJWT } from "@src/router/middleware";
import { verify } from "jsonwebtoken";

import expressPlayground from "graphql-playground-middleware-express";
import { ExecuteFunction, SubscriptionServer } from "subscriptions-transport-ws";

import { schema } from "gql/graphql";
import { execute, subscribe } from "graphql";

const app: express.Express = express();

app.use(helmet());
app.use("/auth", authRouter);
app.use("/graphql",
	bodyParser.json(),
	cookieParser(),
	expressJWT,
	(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
		req.error = err;
		next();
	},
	expressGraphql);
app.get("/playground", expressPlayground({ endpoint: "/graphql", subscriptionEndpoint: "/graphql" }));
app.get("/", (req, res) => res.send("Hello World"));

export const server: Server = app.listen(process.env.PORT || 8080, () => {
	debug("app:express")(`Now listening on port ${process.env.PORT || 8080}`);

	// tslint:disable-next-line:no-unused-expression
	new SubscriptionServer({
		execute: execute as ExecuteFunction,
		subscribe,
		schema,
		onConnect: async (header: any) => {
			let jwt = "";

			if (header && header.Authorization) {
				jwt = header.Authorization.split("Bearer ")[1];
			} else {
				// Might aswell just throw an error if auth is required to subscribe
				// throw new Error("Authentication is required to perform this action");
				return {};
			}

			return new Promise(
				(resolve, reject) => verify(
					jwt,
					process.env.JWT_SECRET || "",
					(err: any, data: any) => err ? reject(err) : resolve({ user: data }),
				),
			);
		},
	}, { server, path: "/graphql" });
});

export default app;
