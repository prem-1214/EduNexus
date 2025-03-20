import {Router} from 'express'
import Video from '../models/video.model.js'
import { videoUploadHandler } from '../controllers/video.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router()

router.post('/upload', upload.fields([
    {
        name : "video",
        maxCount : 1
    },
    {
        name : "thumbnail",
        maxCount : 1
    }
]), videoUploadHandler);

// router.get('/videos', async (req, res) => {
//     try {
//       const videos = await Video.find().populate('uploader', 'name');
//       res.json(videos);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching videos', error });
//     }
//   });
 

export default router