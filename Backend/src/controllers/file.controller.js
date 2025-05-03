import File from "../models/file.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const fileUploadHandler = async (req, res) => {
  try {
    const { fileName, description, category } = req.body

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    const filePath = req.file.path

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"]
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: "Invalid file type" })
    }

    console.log("req.user in file controller", req.user)

    // Upload the file to Cloudinary
    const uploadedFile = await uploadOnCloudinary(filePath)

    if (!uploadedFile) {
      return res.status(500).json({ message: "Cloudinary upload failed" })
    }

    console.log("req.user in file upload:", req.user)

    // Save file details to the database
    const newFile = new File({
      fileName,
      fileUrl: uploadedFile?.secure_url || "",
      fileSize: req.file.size,
      owner: req.user,
      category,
      description,
      program: req.body.program,
      branch: req.body.branch,
      semester: req.body.semester,
      subject: req.body.subject,
    })

    await newFile.save()
    res
      .status(201)
      .json({ message: "File uploaded successfully!", file: newFile })
  } catch (error) {
    console.error("File Upload Error:", error)
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message })
  }
}

const editFileHandler = async (req, res) => {
  try {
    const { id } = req.params
    const { fileName, description, category, program, branch, semester, subject } = req.body

    // Find the file by ID
    const file = await File.findById(id)
    if (!file) {
      return res.status(404).json({ message: "File not found" })
    }

    // Ensure the user is the owner of the file
    if (file.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized: You can only edit your own files" })
    }

    // Update file details if provided
    if (fileName) file.fileName = fileName
    if (description) file.description = description
    if (category) file.category = category
    if (program) file.program = program
    if (branch) file.branch = branch
    if (semester) file.semester = semester
    if (subject) file.subject = subject

    // Handle file replacement if a new file is uploaded
    if (req.file) {
      const uploadedFile = await uploadOnCloudinary(req.file.path)
      if (!uploadedFile) {
        return res.status(500).json({ message: "Cloudinary upload failed" })
      }
      file.fileUrl = uploadedFile.secure_url
    }

    // Save the updated file
    await file.save()

    return res.status(200).json({ message: "File updated successfully", file })
  } catch (error) {
    console.error("Error editing file:", error)
    return res.status(500).json({ message: "Error editing file", error })
  }
}



export { fileUploadHandler, 
         editFileHandler
 }
