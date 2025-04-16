import { Router } from "express"
import {
  googleLoginHandler,
  loginHandler,
  registerHandler,
} from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(registerHandler)

router.post("/login", loginHandler)

router.route("/google-login").post(googleLoginHandler)

export default router
