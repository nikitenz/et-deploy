import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select("-password"); // attach user

    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
