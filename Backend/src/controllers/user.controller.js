import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerHandler = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log("register req.body : ", req.body)
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" })
    }

    const existedUser = await User.findOne({ email })
    if (existedUser) {
      console.log("user already eists...")
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      userName: email.split("@")[0],
      email: email,
      password: hashedPassword,
    })

    console.log("user saved: ", user)

    res.status(201).json({ message: "User registered successfully", user })
  } catch (error) {
    console.error("Error registering user:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken

    await user.save({ validateBeforeSave: false })

    return {
      accessToken,
      refreshToken,
    }
  } catch (error) {
    console.log("error in toekn generation :", error)
  }
}

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log("req.body from login:", req.body)

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide credentials",
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      })
    }
    // const hashedPassword = await bcrypt.hash(password, 10)
    const isPasswordValid = bcrypt.compare(password, user.password)
    console.log("Password is correct : ", isPasswordValid)

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    )

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )

    console.log("loggedInUser:", loggedInUser)
    console.log("accesstoken:", accessToken)

    return res
      .status(200)
      .cookie("accessToken", accessToken, { httpOnly: true }, sameSite : "none", secure : true)
      .cookie("refreshToken", refreshToken, { httpOnly: true }, sameSite : "none", secure : true)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
  } catch (error) {
    console.error("Error during login:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const googleLoginHandler = async (req, res) => {
  try {
    const { userInfo } = req.body
    console.log("req.body : ", userInfo)
    console.log("email : req.body from login :", userInfo.email)

    const email = userInfo.email
    let profilePicture = userInfo.picture

    let user = await User.findOne({ email })

    if (user) {
      console.log("user existes")
    }
    if (!user) {
      user = await User.create({
        email,
        userName: email.split("@")[0],
        avatar: profilePicture || "",
        googleLogin: true,
      })
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    )

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )

    console.log("loggedInUser:", loggedInUser)
    console.log("Access Token Payload:", jwt.decode(accessToken))

    return res
      .status(200)
      .cookie("accessToken", accessToken, { httpOnly: true }, sameSite : "none", secure : true)
      .cookie("refreshToken", refreshToken, { httpOnly: true }, sameSite : "none", secure : true)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
  } catch (error) {
    console.error("Error during login:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

const logoutHandler = async (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true })
    res.clearCookie("refreshToken", { httpOnly: true })

    console.log("User logged out successfully")

    return res.status(200).json({ message: "User logged out successfully" })
  } catch (error) {
    console.error("Error during logout:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export {
  registerHandler,
  generateAccessAndRefreshToken,
  loginHandler,
  googleLoginHandler,
  logoutHandler,
}
