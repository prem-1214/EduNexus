import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

const isAuthenticated = async (req, res, next) => {
  try {
    // const token = req.headers.authorization?.split(" ")[1];
    const token = req.cookies.accessToken; // Use cookies for token storage
    console.log("token cookies: ", req.cookies.accessToken); // Log cookies for debugging
    console.log("Token:", token); // Log the token for debugging
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 🔥 Fetch full user from database
    const user = await User.findById(decoded.id).select("-password"); // exclude password
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user; // Attach full user object
    console.log("Authenticated User:", req.user);

    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default isAuthenticated;
