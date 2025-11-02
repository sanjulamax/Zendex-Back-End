import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
  if (!tokenVerified) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
