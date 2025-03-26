import File from "../models/file.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const fileUploadHandler = async (req, res) => {
  try {
    const { fileName, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    console.log("req.user in file controller", req.user)

    // Upload the file to Cloudinary
    const uploadedFile = await uploadOnCloudinary(filePath);

    if (!uploadedFile) {
      return res.status(500).json({ message: "Cloudinary upload failed" });
    }

    console.log("req.user in file upload:", req.user)

    // Save file details to the database
    const newFile = new File({
      fileName,
      fileUrl: uploadedFile?.secure_url || "",
      fileSize: req.file.size,
      owner: req.user, // Use the authenticated user's ID as the owner
      category,
      description, 
    });

    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully!", file: newFile });
  } catch (error) {
    console.error("File Upload Error:", error);
    res.status(500).json({ message: "File upload failed", error });
  }
};

export { fileUploadHandler };