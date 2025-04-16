import mongoose, { Schema } from "mongoose"

const fileSchema = new Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["Notes", "Assignments", "Resources", "Others"],
      default: "Others",
    },
    description: { type: String, maxlength: 500 },
    program: {
      type: String,
      enum: ["B.Tech", "B.Sc", "BBA", "BCA", "Other"],
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    semester: {
      type: Number,
      min: 1,
      max: 8,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    uploadedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
)

const File = mongoose.model("File", fileSchema)

export default File
