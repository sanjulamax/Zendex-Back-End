import express from "express";

import {
  saveMessageToDb,
  getChatsFromDb,
  saveChatList,
  fetchChatList,
  deleteMessageFromDb,
} from "../controllers/chat-controller.js";

const chatRouter = express.Router();

chatRouter.post("/saveChat", saveMessageToDb);
chatRouter.post("/getChats", getChatsFromDb);
chatRouter.post("/saveChatList", saveChatList);
chatRouter.post("/getChatList", fetchChatList);
chatRouter.post("/deleteMessage", deleteMessageFromDb);

export default chatRouter;
