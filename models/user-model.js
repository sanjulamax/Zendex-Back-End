import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  profilePicUrl: { type: String, default: "" },
  aboutYou: { type: String, default: "" },
  chatList: [
    {
      chatUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      updatedTime: { type: Date, default: Date.now },
      lastMessage: { type: String, default: "" },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  onlineState: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
