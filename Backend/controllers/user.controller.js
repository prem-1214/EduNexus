import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'

const registerHandler = async (req, res) => {
    try {
        const { userName, email, password, avatar, watchHistory, refreshToken } = req.body


        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            avatar,
            watchHistory ,
            refreshToken
        })

        await user.save()
        console.log("user saved:", user)
        res.status(201).json({ message: "User registered successfully", user })
    } catch (error) {
        console.error("Error registering user:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export { registerHandler }