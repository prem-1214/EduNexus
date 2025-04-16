import { Router } from "express"
import User from "../models/user.model.js"
import isAuthenticated from "../middlewares/auth.middleware.js"
import { logoutHandler } from "../controllers/user.controller.js"

const router = Router()

router.get("/studentDashboard", isAuthenticated, (req, res) => {
  const userId = req.user.id // Extract user ID from the decoded token
  console.log("req.user in /dashboard", req.user)
  console.log("userid in /dashboard", userId)

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      res.json(user)
    })
    .catch((error) => {
      console.error("Error fetching user:", error)
      res.status(500).json({ message: "Error fetching user", error })
    })
})

router.get("/educatorDashboard", isAuthenticated, (req, res) => {
  const userId = req.user.id // Extract user ID from the decoded token
  console.log("req.user in /dashboard", req.user)
  console.log("userid in /dashboard", userId)

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      res.json(user)
    })
    .catch((error) => {
      console.error("Error fetching user:", error)
      res.status(500).json({ message: "Error fetching user", error })
    })
})

router.post("/logout", isAuthenticated, logoutHandler)

export default router
