import chatModel from "../models/chat-model.js";
import userModel from "../models/user-model.js";

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

export const deleteMessageFromDb = async (req, res) => {
  const { messageId } = req.body;

  try {
    const deletedMessage = await chatModel.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res.json({
        message: "Message Not Found",
        data: null,
        success: false,
      });
    }

    res.json({
      message: "Message Deleted Successfully",
      data: deletedMessage,
      success: true,
    });
  } catch (e) {
    res.json({
      message: "Error Occured While Deleting Message",
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

export const saveChatList = async (req, res) => {
  const { userId, chatUserId, lastMessage } = req.body;
  console.log("chats", chatUserId, userId);
  console.log("LAST MESSAGE", lastMessage);
  try {
    const chatListData = await userModel.findById(userId);
    if (
      chatListData.chatList.findIndex(
        (chat) => chat.chatUserId?.toString() == chatUserId.toString()
      ) !== -1
    ) {
      await userModel.updateOne(
        {
          _id: userId,
          "chatList.chatUserId": chatUserId,
        },
        {
          $set: {
            "chatList.$.updatedTime": new Date(),
            "chatList.$.lastMessage": lastMessage,
          },
        }
      );
    } else {
      await userModel.updateOne(
        { _id: userId },
        {
          $push: {
            chatList: {
              chatUserId: chatUserId,
              updatedTime: new Date(),
              lastMessage: lastMessage,
            },
          },
        }
      );
    }

    const updatedUserData = await userModel.findById(userId);

    res.json({
      message: "Chat List Fetched Successfully",
      data: updatedUserData.chatList,
      success: true,
    });
  } catch (e) {
    console.log("Error Occured in Saving Chat List", e);
    res.json({
      message: "An Unknown Error Occured",
      data: e,
      success: false,
    });
  }
};

export const fetchChatList = async (req, res) => {
  const { userId } = req.body;
  try {
    const userData = await userModel.findById(userId);
    res.json({
      message: "Chat List Fetched Successfully",
      data: userData.chatList,
      success: true,
    });
  } catch (e) {
    console.log("Error Occured in Fetching Chat List", e);
    res.json({
      message: "An Unknown Error Occured",
      data: e,
      success: false,
    });
  }
};
