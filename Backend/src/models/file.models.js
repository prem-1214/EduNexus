import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    //   unique: true,
    }, 
    fileUrl: {
      type: String,
    //   unique: true,
      required: true,
    },
    fileSize: {
      type: Number, // File size in bytes
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    //   required: true,
    },
    category: {
      type: String, // Category of the file (e.g., Notes, Assignments, etc.)
      enum: ["Notes", "Assignments", "Resources", "Others"], // Predefined categories
      default: "Others",
    },
    description: {
      type: String, // Optional description of the file
      maxlength: 500,
    },
    uploadedAt: {
      type: Date, // Timestamp for when the file was uploaded
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const File = mongoose.model("File", fileSchema);

export default File;