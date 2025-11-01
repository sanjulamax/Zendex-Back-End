import chatModel from "../models/chat-model.js";

export const saveMessageToDb = async (req, res) => {
  const messageData = req.body;

  try {
    const savedMessage = await chatModel.create({
      content: messageData.content,
      recipient: messageData.recipient,
      sender: messageData.sender,
      timestamp: messageData.timestamp,
    });

    if (!savedMessage) {
      return res.json({
        message: "Message Not Saved",
        data: null,
        success: false,
      });
    }
    res.json({
      message: "Message Saved Successfully",
      data: savedMessage,
      success: true,
    });
  } catch (e) {
    res.json({
      message: "Error Occured While Saving Message",
      data: e,
      success: false,
    });
  }
};

export const getChatsFromDb = async (req, res) => {
  const inboxData = req.body;
  console.log("get msg inboxData", inboxData);
  try {
    const chatList = await chatModel.find({
      $or: [
        { sender: inboxData.sender, recipient: inboxData.receiver },
        {
          sender: inboxData.receiver,
          recipient: inboxData.sender,
        },
      ],
    });
    console.log(chatList);
    console.log("Chats Fetched Successfully from DB");
    res.json({
      message: "Chats Fetched Successfully",
      data: chatList,
      success: true,
    });
  } catch (e) {
    console.log("Fuck Error", e);
    res.json({
      message: "Error Occured While Fetching Chats",
      data: e,
      success: false,
    });
  }
};
