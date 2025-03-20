import mongoose, { mongo, Schema } from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    userName : {
        type : String,
        // required : true,
        // unique : [true, 'This username is already taken.'],
        lowercase : true,
        trim : true
    },
    email : {
        type : String, 
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address.',
          ],
    },
    password : {
        type : String,
        required : [true, 'Password is required.'],
        minlength : 8
    },
    avatar : {
        type: String,  //cloudinary url
        // required : true
    },
    watchHistory : {
        type : Schema.Types.ObjectId,
        ref : "Video"
    },
    refreshToken : {
        type : String
    }
}, {
    timestamps : true
})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(userId) {
    return jwt.sign({
        _id : this.userId,
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