import express from "express";
import {
  profileUpdator,
  signInController,
  signUpController,
} from "../controllers/auth-controller.js";
import { authScreenProtector } from "../controllers/auth-protector.js";

const authRouter = express.Router();

authRouter.post("/signup", signUpController);
authRouter.post("/signin", signInController);
authRouter.get("/authscreenprotector", authScreenProtector);
authRouter.post("/updateprofile", profileUpdator);

export default authRouter;
