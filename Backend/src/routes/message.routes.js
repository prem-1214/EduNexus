import express from "express"
import isAuthenticated from "../middlewares/auth.middleware.js"
import {
  sendMessage,
  getAllMessages,
} from "../controllers/message.controller.js"

const router = express.Router()

// Send a new message
router.post("/", isAuthenticated, sendMessage)

// Get all messages in a chat
router.get("/:chatId", isAuthenticated, getAllMessages)

export default router
