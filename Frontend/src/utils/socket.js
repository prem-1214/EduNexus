import { io } from "socket.io-client"

const ENDPOINT = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000"

const socket = io(ENDPOINT, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: true, // already connects
})

export default socket
