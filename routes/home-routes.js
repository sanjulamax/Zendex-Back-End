import express from "express";
import { searchByUsernameController } from "../controllers/search-controller.js";

const homeRouter = express.Router();

homeRouter.post("/search", searchByUsernameController);

export default homeRouter;
