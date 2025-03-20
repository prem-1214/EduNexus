import mongoose, { Schema } from "mongoose"
import User from "./user.model.js"

const fileSchema = new Schema({
    fileName : {
        type : String,
        required : true,
        unique : true,
    },
    fileUrl : {
        type : String,
        unique : true,
        required : true,
        default : ""
    },
    fileSize : {
        type : Number 
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})

const File = mongoose.model("File", fileSchema)

export default File