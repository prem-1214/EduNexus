import { Router } from "express"
import isAuthenticated from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { fileUploadHandler } from "../controllers/file.controller.js"
import File from "../models/file.models.js" // Add this import

const router = Router()

// Route for uploading files
router.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  fileUploadHandler
)

router.get("/my-files", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id
    const userFiles = await File.find({ owner: userId })
      .populate("owner", "userName avatar")
      .sort({ createdAt: -1 })
    console.log("userFiles in get my files", userFiles)

    const formattedFiles = userFiles.map((file) => ({
      ...file.toObject(),
      uploadedAtFormatted: new Date(file.uploadedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))

    res.status(200).json(formattedFiles)
  } catch (err) {
    console.error("Error fetching files:", err) // Add detailed logging
    res
      .status(500)
      .json({ message: "Error fetching files", error: err.message })
  }
})

// Route to fetch all files for students
router.get("/all-files", isAuthenticated, async (req, res) => {
  try {
    const allFiles = await File.find({})
      .populate("owner", "userName email role")
      .sort({ createdAt: -1 })

    const formattedFiles = allFiles.map((file) => ({
      ...file.toObject(),
      uploadedAtFormatted: new Date(file.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))

    res.status(200).json(formattedFiles)
  } catch (err) {
    console.error("Error fetching all files:", err)
    res
      .status(500)
      .json({ message: "Error fetching files", error: err.message })
  }
})

export default router
