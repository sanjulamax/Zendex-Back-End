import userModel from "../models/user-model.js";

export const searchByUsernameController = async (req, res) => {
  const { username } = req.body;
  console.log("Searched Username:", username);

  try {
    const searchedUser = await userModel.findOne({
      username: username,
    });
    if (!searchedUser) {
      return res.json({
        message: "User Not Found",
        data: null,
        success: false,
      });
    }
    res.json({
      message: "User Found Successfully",
      data: searchedUser,
      success: true,
    });
  } catch (e) {
    res.json({
      message: "Error Occured While Searching User",
      data: e,
      success: false,
    });
  }
};

export const searchByIdController = async (req, res) => {
  const { targetUserId } = req.body;
  console.log("Searched User ID:", targetUserId);

  try {
    const searchedUser = await userModel.findById(targetUserId);
    if (!searchedUser) {
      return res.json({
        message: "User Not Found",
        data: null,
        success: false,
      });
    }
    res.json({
      message: "User Found Successfully",
      data: searchedUser,
      success: true,
    });
  } catch (e) {
    res.json({
      message: "Error Occured While Searching User",
      data: e,
      success: false,
    });
  }
};
