import jwt from "jsonwebtoken";

export const authScreenProtector = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(200).json({
      success: true,
      message: "User is not authenticated",
      user: null,
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(200).json({
        success: true,
        message: "User is not authenticated",
        user: null,
      });
    }
    if (decode) {
      return res.status(200).json({
        success: false,
        message: "User is authenticated",
        user: decode,
      });
    }
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "Error in Authentication",
      user: null,
    });
  }
};
