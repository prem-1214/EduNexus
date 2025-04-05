import { Router } from 'express';
import isAuthenticated from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { fileUploadHandler } from '../controllers/file.controller.js';
import File from '../models/file.models.js'; // Add this import

const router = Router();

// Route for uploading files
router.post("/upload", isAuthenticated, upload.single("file"), fileUploadHandler);

router.get("/my-files", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const userFiles = await File.find({ owner: userId }).sort({ createdAt: -1 });
    console.log("userFiles in get my files", userFiles);
    res.status(200).json(userFiles);
  } catch (err) {
    console.error("Error fetching files:", err); // Add detailed logging
    res.status(500).json({ message: "Error fetching files", error: err.message });
  }
});

export default router;