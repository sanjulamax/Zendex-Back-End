import userModel from "../models/user-model.js";
export const socketController = (io) => {
  io.on("connection", async (socket) => {
    console.log("Connection Info", socket.handshake.auth);

    socket.join(socket.handshake.auth.sender);
    await saveOnlineState(socket.handshake.auth.sender, true);
    console.log("User Connected", socket.handshake.auth.sender);
    io.emit("users_connected", socket.handshake.auth.sender);

    socket.on("send_message", (message) => {
      console.log("Message Received", message);
      console.log("Sending to:", socket.handshake.auth.recipient);

      const sendResult = io
        .to(socket.handshake.auth.recipient)
        .emit("receive_message", message);
      console.log("Send Result:", sendResult);
    });

    socket.on("disconnect", async () => {
      console.log("User Disconnected", socket.handshake.auth.sender);
      await saveOnlineState(socket.handshake.auth.sender, false);
      io.emit("users_disconnected", socket.handshake.auth.sender);
    });
  });
};

const saveOnlineState = async (userId, state) => {
  console.log("Saving Online State:", userId, state);
  try {
    let onlineStateSavedData;
    if (state === true) {
      onlineStateSavedData = await userModel.findByIdAndUpdate(
        userId,
        { onlineState: state, lastSeen: null },
        { new: true }
      );
    } else {
      onlineStateSavedData = await userModel.findByIdAndUpdate(
        userId,
        { onlineState: state, lastSeen: new Date() },
        { new: true }
      );
    }
    console.log("Online State Saved:", onlineStateSavedData);
    return onlineStateSavedData;
  } catch (err) {
    console.error("Error saving online state:", err);
    return null;
  }
};
