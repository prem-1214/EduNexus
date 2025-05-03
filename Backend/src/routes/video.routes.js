import { Router } from "express"
import Video from "../models/video.model.js"
import User from "../models/user.model.js"
import { editVideoHandler, videoUploadHandler } from "../controllers/video.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import isAuthenticated from "../middlewares/auth.middleware.js"
import paginate from "../middlewares/pagination.js"

const router = Router()

router.post(
  "/upload",
  isAuthenticated,
  upload.fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  videoUploadHandler
)

router.get("/uploadedVideos", isAuthenticated, paginate, async (req, res) => {
  try {
    const userId = req.user._id
    const { page, limit, skip } = req.pagination
    const { program, branch, semester, subject, searchTerm } = req.query

    const filters = { uploader: userId }
    // console.log("Filters:", filters)

    if (program) filters.program = program
    if (branch) filters.branch = branch
    if (semester) filters.semester = semester
    if (subject) filters.subject = subject
    if (searchTerm) filters.title = { $regex: searchTerm, $options: "i" }

    const videos = await Video.find(filters)
      .populate("uploader", "userName avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Video.countDocuments(filters)
    const totalPages = Math.ceil(total / limit)
    // console.log("Total Videos:", total)
    // console.log("Videos:", videos)

    // console.log("req.user:", req.user._id); // Log the user object
    // console.log("before populating video")

    // const populatedVideo = await Video.find({ uploader: userId })
    //                             .populate('uploader', 'userName avatar')
    //                             .sort({ createdAt: -1 });
    // const populatedVideo = await Video.find().populate('uploader', 'userName avatar').sort({createdAt : -1})
    // console.log("Fetched Videos:", populatedVideo)

    const formattedVideos = videos.map((video) => ({
      ...video.toObject(),
      uploadedAtFormatted: new Date(video.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))

    // console.log("Formatted Videos:", formattedVideos)
    return res
      .status(200)
      .json({ videos: formattedVideos, totalPages, total, page, limit })
  } catch (error) {
    return res.status(500).json({ message: "Error fetching videos", error })
  }
})

router.get("/exploreVideos", isAuthenticated, paginate, async (req, res) => {
  try {
    const { page, limit, skip } = req.pagination

    const filters = {}
    const { program, branch, semester, subject, searchTerm } = req.query

    if (program) filters.program = program
    if (branch) filters.branch = branch
    if (semester) filters.semester = semester
    if (subject) filters.subject = subject
    if (searchTerm) {
      filters.title = { $regex: searchTerm, $options: "i" }
    }

    const videos = await Video.find(filters)
      .populate("uploader", "userName avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Count total docs for pagination info
    const total = await Video.countDocuments(filters)
    const totalPages = Math.ceil(total / limit)

    // Format createdAt date for each video
    const formattedVideos = videos.map((video) => ({
      ...video.toObject(),
      uploadedAtFormatted: new Date(video.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))

    // Return paginated data and total count
    return res
      .status(200)
      .json({ videos: formattedVideos, totalPages, total, page, limit })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Error fetching videos", error })
  }
})

router.delete("/deleteVideo/:id", isAuthenticated, async (req, res) => {
  try {
    const videoId = req.params.id
    const userId = req.user._id

    // Find the video to ensure it belongs to the authenticated user
    const video = await Video.findOne({ _id: videoId, uploader: userId })
    if (!video) {
      return res
        .status(404)
        .json({ message: "Video not found or not authorized to delete" })
    }
    // Delete the video
    await Video.deleteOne({ _id: videoId })
    return res.status(200).json({ message: "Video deleted successfully" })
  } catch (error) {
    console.error("Error deleting video:", error)
    return res.status(500).json({ message: "Error deleting video", error })
  }
})

router.patch("/editVideo/:id", isAuthenticated, 
    upload.fields([
      {
        name : "thumbnail",
        maxCount : 1
      }
    ])
  , editVideoHandler)

// Route to get the total number of students
router.get("/total-students", async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" })
    console.log("Total Students:", totalStudents)
    res.json({ totalStudents })
  } catch (error) {
    console.error("Error fetching total students:", error)
    res.status(500).json({ message: "Error fetching total students" })
  }
})

router.get("/students", async (req, res) => {
  try {
    const students = await User.find({ role: "student" }, "userName email")
    console.log("Students:", students)
    res.json(students)
  } catch (error) {
    console.error("Error fetching students:", error)
    res.status(500).json({ message: "Error fetching students" })
  }
})

export default router
