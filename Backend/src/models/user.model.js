import mongoose, { mongo, Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    userName: {
      type: String,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "This email is already in use."],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          const studentRegex = /^\d{2}[a-zA-Z]{2}\d{5}@gsfcuniversity\.ac\.in$/
          const educatorRegex = /^[a-zA-Z]+\.[a-zA-Z]+@gsfcuniversity\.ac\.in$/
          return studentRegex.test(v) || educatorRegex.test(v)
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      validate: {
        validator: function (value) {
          return this.googleLogin || (value && value.length >= 8)
        },
        message:
          "Password is required and must be atleast 8 characters long...",
      },
    },
    role: {
      type: String,
      enum: ["student", "educator", "admin"],
      default: "student",
    },
    isActive: {
      type: Boolean,
      default: true, //no default restriction
    },
    avatar: {
      type: String, //cloudinary url
      default: "", // default conditional avatar from frontend
    },
    // watchHistory : {
    //     type : Schema.Types.ObjectId,
    //     ref : "Video"
    // },
    googleLogin: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  const studentRegex = /^\d{2}[a-zA-Z]{2}\d{5}@gsfcuniversity\.ac\.in$/
  const educatorRegex = /^[a-zA-Z]+\.[a-zA-Z]+@gsfcuniversity\.ac\.in$/

  if (studentRegex.test(this.email)) {
    this.role = "student"
  } else if (educatorRegex.test(this.email)) {
    this.role = "educator"
  }

  if (!this.isModified("password")) return next()
  this.password = bcrypt.hash(this.password, 10)

  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (userId) {
  return jwt.sign(
    {
      id: this._id,
      username: this.userName,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  )
}

userSchema.methods.generateRefreshToken = function (userId) {
  return jwt.sign(
    {
      id: this._id,
      username: this.userName,
      email: this.email,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  )
}

const User = mongoose.model("User", userSchema)

export default User
