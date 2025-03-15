import mongoose, { mongo, Schema } from "mongoose"

const userSchema = new Schema({
    userName : {
        type : String,
        required : true,
        unique : [true, 'This username is already taken.'],
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
        required : true
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


const User = mongoose.model("User", userSchema)


export default User