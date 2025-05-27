import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import videoRouter from "./routes/video.routes.js"
import fileRouter from "./routes/file.routes.js"
import userRouter from "./routes/user.routes.js"
import chatRouter from "./routes/chat.routes.js"
import messageRouter from "./routes/message.routes.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

const allowedOrigins = [
   process.env.FRONTEND_URI, // Deployed frontend
  "http://localhost:5173", // Local frontend
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp")
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("API is running...")
})

// Routes
app.use("/auth", authRouter)
app.use("/video", videoRouter)
app.use("/file", fileRouter)
app.use("/user", userRouter)
app.use("/chat", chatRouter)
app.use("/message", messageRouter)

export default app
