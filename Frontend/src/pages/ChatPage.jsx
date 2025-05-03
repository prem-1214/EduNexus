import React, { useEffect } from "react"
import { useChat } from "../Context/ChatContext.jsx"
import ChatSidebar from "../components/Chat/ChatSidebar.jsx"
import { useUser } from "../context/UserContext.jsx"
import socket from "../utils/socket.js"
import ChatWindow from "../components/Chat/ChatWindow.jsx"

const ChatPage = () => {
  const { selectedChat } = useChat()
  const { user } = useUser()

  useEffect(() => {
    if (user && user._id) {
      socket.emit("setup", user)
    }
    const onConnect = () => {
      console.log("✅ Socket.IO connected!", socket.id)
    }
    socket.on("connected", onConnect)
    return () => {
      socket.off("connected", onConnect)
      socket.disconnect()
    }
  }, [user])

  return (
    <div className="flex h-screen">
      <ChatSidebar />
      {selectedChat ? (
        <ChatWindow />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
          Select a chat to start messaging
        </div>
      )}
    </div>
  )
}

export default ChatPage
