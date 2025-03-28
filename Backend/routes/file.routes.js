import {Router} from 'express'
import authenticate from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'
import { fileUploadHandler } from '../controllers/file.controller.js'

const router = Router()

router.
post("/upload", authenticate, upload.single("file"), fileUploadHandler)


export default router