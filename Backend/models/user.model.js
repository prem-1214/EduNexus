import mongoose, { mongo, Schema } from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    userName : {
        type : String,
<<<<<<< HEAD
        required : true,
        unique : [true, 'This username is already taken.'],
=======
        // required : true,
        // unique : [true, 'This username is already taken.'],
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4
        lowercase : true,
        trim : true
    },
    email : {
<<<<<<< HEAD
        type : String,
=======
        type : String, 
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4
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
<<<<<<< HEAD
        required : true
=======
        // required : true
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4
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

<<<<<<< HEAD
userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id : this._id,
=======
userSchema.methods.generateAccessToken = function(userId) {
    return jwt.sign({
        _id : this.userId,
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4
        email : this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)}

<<<<<<< HEAD
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id : this._id
=======
userSchema.methods.generateRefreshToken = function (userId){
    return jwt.sign({
        _id : this.userId
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4
    },
    process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
})
}

const User = mongoose.model("User", userSchema)

export default User