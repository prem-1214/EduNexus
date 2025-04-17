import { Router } from 'express';
import isAuthenticated from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { fileUploadHandler } from '../controllers/file.controller.js';
import File from '../models/file.models.js'
import paginate from '../middlewares/pagination.js'

const router = Router()

// Route for uploading files
router.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  fileUploadHandler
)

router.get("/my-files", isAuthenticated, paginate, async (req, res) => {
  try {
    const userId = req.user._id;
    // const userFiles = await File.find({ owner: userId }).populate('owner', 'userName avatar').sort({ createdAt: -1 });
    // console.log("userFiles in get my files", userFiles)

    const {page, limit, skip} = req.pagination
    const {program, branch, semester, subject, searchTerm} = req.query
    const filters = {owner : userId}

    if(program) filters.program = program
    if(branch) filters.branch = branch
    if(semester) filters.semester = semester
    if(subject) filters.subject = subject
    if(searchTerm) filters.fileName = { $regex: searchTerm, $options: "i" }

    const paginatedFiles = await File.find({ owner: userId })
    .populate('owner', 'userName avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    
    const totalFiles = await File.countDocuments(filters)
    const totalPages = Math.ceil(totalFiles / limit)

    console.log("paginatedFiles in get my files", paginatedFiles)

    const formattedFiles = paginatedFiles.map((file) => ({
      ...file.toObject(),
      uploadedAtFormatted: new Date(file.uploadedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))

    res.status(200).json({files : formattedFiles, totalFiles, totalPages, page, limit});
  } catch (err) {
    console.error("Error fetching files:", err) // Add detailed logging
    res
      .status(500)
      .json({ message: "Error fetching files", error: err.message })
  }
})

// Route to fetch all files for students
router.get("/all-files", isAuthenticated, paginate, async (req, res) => {
  try {
   
    const {page, limit, skip} = req.pagination
    const {program, branch, semester, subject, searchTerm} = req.query
    const filters = {}

    if(program) filters.program = program
    if(branch) filters.branch = branch
    if(semester) filters.semester = semester
    if(subject) filters.subject = subject
    if(searchTerm) filters.fileName = { $regex: searchTerm, $options: "i" }

    const files = await File.find(filters)
      .populate('owner', 'userName avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const totalFiles = await File.countDocuments(filters)
    const totalPages = Math.ceil(totalFiles / limit)


    // const allFiles = await File.find({})
    //   .populate("owner", "userName email role")
    //   .sort({ createdAt: -1 });

    const formattedFiles = files.map((file) => ({
      ...file.toObject(),
      uploadedAtFormatted: new Date(file.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
    console.log("formattedFiles in get all files", formattedFiles)

    res.status(200).json({files : formattedFiles, totalFiles, totalPages, page, limit});
  } catch (err) {
    console.error("Error fetching all files:", err)
    res
      .status(500)
      .json({ message: "Error fetching files", error: err.message })
  }
})

export default router
