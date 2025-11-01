import express from "express";

import {
  saveMessageToDb,
  getChatsFromDb,
} from "../controllers/chat-controller.js";

const chatRouter = express.Router();

chatRouter.post("/saveChat", saveMessageToDb);
chatRouter.post("/getChats", getChatsFromDb);

export default chatRouter;
