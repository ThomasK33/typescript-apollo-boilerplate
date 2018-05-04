import { Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";

// TODO: Add auth logic

const authRouter: Router = Router();

authRouter.get("/", (req, res) => res.status(200).send("TBD"));

export default authRouter;
