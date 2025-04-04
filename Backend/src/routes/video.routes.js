import {Router} from 'express'
import Video from "../models/video.model.js"
import User from '../models/user.model.js';
import { videoUploadHandler } from '../controllers/video.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import isAuthenticated from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/upload', isAuthenticated, upload.fields([
    {
        name : "video", 
        maxCount : 1
    },
    {
        name : "thumbnail", 
        maxCount : 1
    }
]), videoUploadHandler);

router.get('/videos', isAuthenticated, async (req, res) => {
    try {
      console.log("req.user:", req.user._id); // Log the user object
      console.log("before populating video")
      const userId = req.user._id;

      const populatedVideo = await Video.find({ uploader: userId })
                                  .populate('uploader', 'userName avatar')
                                  .sort({ createdAt: -1 });
      // const populatedVideo = await Video.find().populate('uploader', 'userName avatar').sort({createdAt : -1})
      // console.log("Fetched Videos:", populatedVideo)
      return res.status(200).json(populatedVideo)
    } catch (error) {
     return res.status(500).json({ message: 'Error fetching videos', error })
    }
  })


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
});



export default router