import Video from '../models/video.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const videoUploadHandler = async (req, res) => {
  try {
    const { title, description, uploader, category, duration } = req.body;

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
      uploader,
      category,
      duration,
    });

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded successfully!', video: newVideo });

  } catch (error) {
    console.error("Video Upload Error:", error);
    res.status(500).json({ message: 'Error uploading video', error });
  }
};

export { videoUploadHandler };
