import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
dotenvExpand(dotenv.config());

import * as debug from "debug";
import * as express from "express";
import * as helmet from "helmet";

import authRouter from "router/auth";
import { graphqlServer } from "router/middleware";

const app: express.Express = express();

app.use(helmet());
app.use("/auth", authRouter);

graphqlServer.applyMiddleware({ app });

app.get("/", (req, res) => res.send("Hello World"));

const server = app.listen({ port: process.env.PORT || 8080 }, () => {
	debug("app:express")(`🚀 Server ready at ${process.env.APP_URL}${graphqlServer.graphqlPath}`);
});

graphqlServer.installSubscriptionHandlers(server);

export default app;
