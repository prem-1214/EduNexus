import { Router } from "express";
import {
  googleLoginHandler,
  loginHandler,
  registerHandler,
  refreshAccessTokenHandler,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerHandler);

router.post("/login", loginHandler);

router.route("/google-login").post(googleLoginHandler);

router.post("/refresh-token", refreshAccessTokenHandler);

export default router;
