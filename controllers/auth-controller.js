import userModel from "../models/user-model.js";

import bcrypt from "bcrypt";
export const signUpController = async (req, res) => {
  const signUpData = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(signUpData.password, salt);
  try {
    const signupUserData = await userModel.create({
      username: signUpData.username,
      email: signUpData.email,
      password: hashedPassword,
      fullname: signUpData.fullname,
    });

    res.json({
      message: "User Signed Up Successfully",
      data: signupUserData.email,
      success: true,
    });
  } catch (e) {
    console.log("Error Occured", e);
    res.json({
      message: "Error Occured While Signing Up",
      data: e,
      success: false,
    });
  }
};
