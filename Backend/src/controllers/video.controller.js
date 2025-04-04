import User from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import Video from '../models/video.model.js';

// const videoUploadHandler = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     // Ensure req.user is populated
//     if (!req.user || !req.user.id) {
//       return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
//     }

//     const user = await User.findById(req.user.id); // Correctly query the user by ID
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     console.log("user:", user); // Log the user object

//     if (!req.files || !req.files.video || !req.files.thumbnail) {
//       return res.status(400).json({ message: 'Missing video or thumbnail file' });
//     }

//     const videoPath = req.files?.video[0].path;
//     const thumbnailPath = req.files?.thumbnail[0].path;

//     const uploadedThumbnail = await uploadOnCloudinary(thumbnailPath);
//     const uploadedVideo = await uploadOnCloudinary(videoPath);

//     if (!uploadedThumbnail || !uploadedVideo) {
//       return res.status(500).json({ message: 'Cloudinary upload failed' });
//     }

//     const newVideo = new Video({
//       title,
//       description,
//       videoUrl: uploadedVideo?.secure_url || "",
//       thumbnailUrl: uploadedThumbnail?.secure_url || "",
//       uploader: req.user.id, // Use ObjectId from req.user
//     });

//     console.log("uploader:", req.user); // Log the uploader ID
//     await newVideo.save();
//     console.log("New Video:", newVideo); // Log the new video object

//     const populatedVideo = await newVideo.populate('uploader', 'userName');
//     console.log("populatedVideo:", populatedVideo); // Log the populated video

//     // Include the username in the response
//     res.status(201).json({
//       message: 'Video uploaded successfully!',
//       video: {
//         ...populatedVideo.toObject(), 
//         // uploader: req.user.username, // Add username to the response
//       },
//     });

//   } catch (error) { 
//     console.error("Video Upload Error:", error);
//     res.status(500).json({ message: 'Error uploading video', error });
//   }
// };



const videoUploadHandler = async (req, res) => {
  try {

    // const { title, description, uploader, category, duration } = req.body;
    const { title, description } = req.body;
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: 'Missing video or thumbnail file' });
    }

    const videoPath = req.files.video[0].path;
    const thumbnailPath = req.files.thumbnail[0].path;

    // console.log("Uploading Thumbnail:", thumbnailPath)
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailPath);

    // console.log("Uploading Video:", videoPath)
    const uploadedVideo = await uploadOnCloudinary(videoPath);

    if (!uploadedThumbnail || !uploadedVideo) {
      return res.status(500).json({ message: 'Cloudinary upload failed' });
    }

    const newVideo = new Video({
      title,
      description,
      videoUrl: uploadedVideo?.secure_url || "",
      thumbnailUrl: uploadedThumbnail?.secure_url || "",
      uploader : req.user.id,
      // category,
      // duration,
    });

    await newVideo.save();
   return res.status(201).json({ message: 'Video uploaded successfully!', video: newVideo });

  } catch (error) {
    console.error("Video Upload Error:", error);
   return res.status(500).json({ message: 'Error uploading video', error });
  }
};



export { videoUploadHandler };
