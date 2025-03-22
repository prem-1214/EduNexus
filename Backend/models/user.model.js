import mongoose, { mongo, Schema } from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import uniqid from 'uniqid'

const userSchema = new Schema({
    userName : {
        type : String,
        // required : true,
        unique : [true, 'This username is already taken.'],
        lowercase : true,
        trim : true
    },
    email : {
        type : String, 
        required : true,
        unique : [true, "This email is already in use."],
        lowercase : true,
        trim : true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address.',
          ],
    },
    password : {
        type : String,
        validate : {
            validator : function (value){
                return this.googleLogin || (value && value.length >= 8)
            },
            message : "Password is required and must be atleast 8 characters long..."
        }
    },  
    avatar : {
        type: String,  //cloudinary url
        // required : true,
        default : ""  //later set in frontend
    },
    watchHistory : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    googleLogin : {
        type : Boolean,
        default : false
    },
    refreshToken : {
        type : String
    }
}, {
    timestamps : true
})
  

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(userId) {
    return jwt.sign({
        _id : this.userId,
        username : this.userName,
        email : this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)}

userSchema.methods.generateRefreshToken = function (userId){
    return jwt.sign({
        _id : this.userId
    },
    process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
})
}

const User = mongoose.model("User", userSchema)

export default User