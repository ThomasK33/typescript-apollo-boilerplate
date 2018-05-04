import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
dotenvExpand(dotenv.config());

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as debug from "debug";
import * as express from "express";
import * as helmet from "helmet";

import authRouter from "@src/router/auth";
import { expressGraphql, expressJWT } from "@src/router/middleware";

import { graphiqlExpress } from "apollo-server-express";
import { Server } from "http";
import { ExecuteFunction, SubscriptionServer } from "subscriptions-transport-ws";

import { schema } from "gql/graphql";
import { execute, subscribe } from "graphql";

const app: express.Express = express();

app.use(helmet());
app.use("/auth", authRouter);
app.use("/graphql", bodyParser.json(), cookieParser(), expressJWT, expressGraphql);
app.use("/graphiql", graphiqlExpress({
	endpointURL: "/graphql",
	subscriptionsEndpoint: `${process.env.APP_WS_URL}/subscriptions`,
}));
app.get("/", (req, res) => res.send("Hello World"));

export const server: Server = app.listen(process.env.APP_PORT || 8080, () => {
	debug("app:express")(`Now listening on port ${process.env.APP_PORT || 8080}`);

	// tslint:disable-next-line:no-unused-expression
	new SubscriptionServer({
		execute: execute as ExecuteFunction,
		subscribe,
		schema,
	}, { server, path: "/subscriptions" });
});

export default app;
