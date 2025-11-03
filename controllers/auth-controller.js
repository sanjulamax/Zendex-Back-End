import userModel from "../models/user-model.js";
import jwt from "jsonwebtoken";

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
      aboutYou: signUpData.aboutYou,
      chatList: [],
      profilePicUrl: signUpData.profilePicUrl || "",
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

export const signInController = async (req, res) => {
  const signInData = req.body;
  try {
    const userExist = await userModel.findOne({ email: signInData.email });
    if (!userExist) {
      return res.json({
        message: "User Not Found",
        data: null,
        success: false,
        token: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      signInData.password,
      userExist.password
    );
    if (!isPasswordValid) {
      return res.json({
        message: "Invalid UserName or Password",
        data: null,
        success: false,
        token: null,
      });
    }

    const jwtToken = jwt.sign(
      {
        email: userExist.email,
        username: userExist.username,
        fullname: userExist.fullname,
        userId: userExist._id,
        aboutYou: userExist.aboutYou,
        profilePicUrl: userExist.profilePicUrl,
        createdAt: userExist.createdAt,
        updatedAt: userExist.updatedAt,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "User Signed In Successfully",
      data: {
        email: userExist.email,
        username: userExist.username,
        fullname: userExist.fullname,
      },
      success: true,
      token: jwtToken,
    });
  } catch (e) {
    console.log("Error Occured", e);
    res.json({
      message: "Error Occured While Signing In",
      data: e,
      success: false,
      token: null,
    });
  }
};

export const profileUpdator = async (req, res) => {
  const updateDetails = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      updateDetails.userId,
      {
        fullname: updateDetails.fullname,
        profilePicUrl: updateDetails.profilePicUrl,
        aboutYou: updateDetails.aboutYou,
      },
      { new: true }
    );

    console.log("Updated User:", updatedUser);
    res.json({
      message: "User Profile Updated Successfully",
      data: updatedUser,
      success: true,
    });
  } catch (e) {
    console.log("Error Occured", e);
    res.json({
      message: "Error Occured While Updating Profile",
      data: e,
      success: false,
    });
  }
};
