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

router.get('/uploadedVideos', isAuthenticated, async (req, res) => {
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


router.get('/exploreVideos', isAuthenticated, async (req, res) => {
    try {
      // console.log("req.user:", req.user._id); // Log the user object
      // console.log("before populating video")
      // const userId = req.user._id;

      // const populatedVideo = await Video.find({ uploader: userId })
      //                             .populate('uploader', 'userName avatar')
      //                             .sort({ createdAt: -1 });
      const populatedVideo = await Video.find().populate('uploader', 'userName avatar').sort({createdAt : -1})
      console.log("Fetched Videos:", populatedVideo)
      return res.status(200).json(populatedVideo)
    } catch (error) {
     return res.status(500).json({ message: 'Error fetching videos', error })
    }
  })

router.delete('/deleteVideo/:id', isAuthenticated, async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user._id;

    // Find the video to ensure it belongs to the authenticated user
    const video = await Video.findOne({ _id: videoId, uploader: userId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found or not authorized to delete' });
    }
    // Delete the video
    await Video.deleteOne({ _id: videoId });
    return res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error("Error deleting video:", error);
    return res.status(500).json({ message: 'Error deleting video', error });
  }
});

router.patch('/editVideo/:id', isAuthenticated, async (req, res) => {
  try {
    const videoId = req.params.id;
    const userId = req.user._id;
    const { title, description } = req.body;

    // Find the video to ensure it belongs to the authenticated user
    const video = await Video.findOne({ _id: videoId, uploader: userId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found or not authorized to update' });
    }

    // Update the video details
    video.title = title || video.title;
    video.description = description || video.description;
    await video.save();

    return res.status(200).json({ message: 'Video updated successfully', video });
  } catch (error) {
    console.error("Error updating video:", error);
    return res.status(500).json({ message: 'Error updating video', error });
  }
});

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