import express from "express";
import {
  createUserController,
  getUserByUsernameController,
} from "./auth.controller";
import { AuthMiddleware } from "../../middleware/auth.middleware";

const AuthRouter = express.Router();

AuthRouter.post("/login", getUserByUsernameController);
AuthRouter.post("/", createUserController);

AuthRouter.get("/test", AuthMiddleware, (req, res) => {
  res.send({ data: (req as any).user });
});

export default AuthRouter;
