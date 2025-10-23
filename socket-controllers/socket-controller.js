export const socketController = (io) => {
  io.on("connection", (socket) => {
    console.log("Connection Info", socket.handshake.auth);

    socket.join(socket.handshake.auth.sender);
    io.emit("users_connected", socket.handshake.auth.sender);

    socket.on("send_message", (message) => {
      console.log("Message Received", message);
      console.log("Sending to:", socket.handshake.auth.recipient);

      const sendResult = io
        .to(socket.handshake.auth.recipient)
        .emit("receive_message", message);
      console.log("Send Result:", sendResult);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.handshake.auth.sender);
      io.emit("users_disconnected", socket.handshake.auth.sender);
    });
  });
};
