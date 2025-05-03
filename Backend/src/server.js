import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/conn.js"
import http from "http"
import { Server } from "socket.io"

dotenv.config()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URI || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  socket.onAny((event, ...args) => {
    console.log(`Event received: ${event}`, args)
  })

  socket.on("setup", (userData) => {
    socket.join(userData._id)
    socket.emit("connected")
  })

  socket.on("join-chat", (room) => {
    socket.join(room)
    console.log(`User joined room: ${room}`)
  })

  socket.on("new-message", (newMessageRecieved) => {
    const chat = newMessageRecieved.chat
    if (!chat || !chat.users) return

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return
      socket.to(user._id).emit("message-received", newMessageRecieved)
    })
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
  })
})

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(
        `Server is running at http://localhost:${process.env.PORT || 5000}`
      )
    })
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error)
  })
