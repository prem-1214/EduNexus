import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken
    console.log("token cookies: ", req.cookies.accessToken)
    console.log("Token:", token)
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." })
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decoded.id).select("-password")
    if (!user) {
      return res.status(401).json({ message: "User not found." })
    }

    req.user = user
    console.log("Authenticated User:", req.user)

    next()
  } catch (error) {
    console.error("Authentication Error:", error)
    res.status(401).json({ message: "Invalid or expired token." })
  }
}

export default isAuthenticated
