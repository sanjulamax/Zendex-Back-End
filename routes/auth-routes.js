import express from "express";
import {
  getOnlineState,
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
authRouter.post("/getonlinestate", getOnlineState);

export default authRouter;
