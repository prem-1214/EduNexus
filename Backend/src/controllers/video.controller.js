import User from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import Video from '../models/video.model.js';


// const videoUploadHandler = async (req, res) => {
//   try {

//     const { title, description } = req.body;
//     if (!req.files || !req.files.video || !req.files.thumbnail) {
//       return res.status(400).json({ message: 'Missing video or thumbnail file' });
//     }

//     const videoPath = req.files.video[0].path;
//     const thumbnailPath = req.files.thumbnail[0].path;

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
//       uploader : req.user?.id,
//     });

//     await newVideo.save();
//    return res.status(201).json({ message: 'Video uploaded successfully!', video: newVideo });

//   } catch (error) {
//     console.error("Video Upload Error:", error);
//    return res.status(500).json({ message: 'Error uploading video', error });
//   }
// };


const videoUploadHandler = async (req, res) => {
  try {
    const { title, description, program, branch, semester, subject } = req.body;

    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: 'Missing video or thumbnail file' });
    }

    const videoPath = req.files.video[0].path;
    const thumbnailPath = req.files.thumbnail[0].path;

    const uploadedThumbnail = await uploadOnCloudinary(thumbnailPath);
    const uploadedVideo = await uploadOnCloudinary(videoPath);

    if (!uploadedThumbnail || !uploadedVideo) {
      return res.status(500).json({ message: 'Cloudinary upload failed' });
    }

    const durationInSeconds = uploadedVideo?.duration || 0;
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedDuration = `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;


    const newVideo = new Video({
      title,
      description,
      program,
      branch,
      semester,
      subject,
      duration : formattedDuration,
      videoUrl: uploadedVideo?.secure_url || "",
      thumbnailUrl: uploadedThumbnail?.secure_url || "",
      uploader: req.user?.id,
    });

    await newVideo.save();
    return res.status(201).json({ message: 'Video uploaded successfully!', video: newVideo });

  } catch (error) {
    console.error("Video Upload Error:", error);
    return res.status(500).json({ message: 'Error uploading video', error });
  }
};


const editVideoHandler = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { title, description } = req.body;

    // Find the video by ID
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Ensure the user is the uploader
    if (video.uploader.toString() !== req.user?.id) {
      return res.status(403).json({ message: 'Unauthorized: You can only edit your own videos' });
    }

    // Update video details
    if (title) video.title = title;
    if (description) video.description = description;

    await video.save();

    return res.status(200).json({ message: 'Video updated successfully!', video });
  } catch (error) {
    console.error("Video Edit Error:", error);
    return res.status(500).json({ message: 'Error editing video', error });
  }
};

export { videoUploadHandler, editVideoHandler };
