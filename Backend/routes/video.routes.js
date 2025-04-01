import {Router} from 'express'
import Video from '../models/video.model.js'
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

router.get('/videos', async (req, res) => {
    try {
      const videos = await Video.find().populate('uploader', 'name');
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching videos', error });
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