import express from "express";
import {
  searchByIdController,
  searchByUsernameController,
} from "../controllers/search-controller.js";

const homeRouter = express.Router();

homeRouter.post("/search", searchByUsernameController);
homeRouter.post("/searchById", searchByIdController);

export default homeRouter;
