import express from "express"
import isAuthenticated from "../middlewares/auth.middleware.js"
import {
  accessChat,
  fetchChats,
  searchUsersController,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} from "../controllers/chat.controller.js"

const router = express.Router()

router.post("/", isAuthenticated, accessChat)
router.get("/", isAuthenticated, fetchChats)
router.get("/search", isAuthenticated, searchUsersController)
router.post("/group", isAuthenticated, createGroupChat)
router.put("/rename", isAuthenticated, renameGroup)
router.put("/groupadd", isAuthenticated, addToGroup)
router.put("/groupremove", isAuthenticated, removeFromGroup)

export default router
