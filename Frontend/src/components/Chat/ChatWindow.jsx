import React, { useEffect, useState } from "react"
import { useChat } from "../../Context/ChatContext.jsx"
import api from "../../utils/axiosInstance.js"

const ChatWindow = () => {
  const { selectedChat, messages, setMessages, socket } = useChat()
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    socket.on("message-received", (msg) => {
      console.log("New message received on frontend:", msg) // Debugging log
      setMessages((prev) => [...prev, msg])
    })

    return () => socket.off("message-received")
  }, [socket])

  useEffect(() => {
    if (selectedChat) {
      console.log("Joining chat room:", selectedChat._id) // Debugging log
      socket.emit("join-chat", selectedChat._id)

      api.get(`/message/${selectedChat._id}`).then((res) => {
        setMessages(res.data)
      })
      console.log("Fetched messages:", messages) // Debugging log
    }
  }, [selectedChat])

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id) // Debugging log
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected") // Debugging log
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
  }, [socket])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      const { data } = await api.post("/message", {
        chatId: selectedChat._id,
        content: newMessage,
      })

      socket.emit("new-message", data) // Emit the new message to the backend
      setMessages([...messages, data]) // Update the local state
      console.log("Message sent:", messages) // Debugging log
      setNewMessage("") // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  if (!selectedChat) return <div className="w-2/3 p-6">Select a chat</div>

  return (
    <div className="w-2/3 flex flex-col justify-between border-l p-6">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div key={msg._id} className="p-2 bg-gray-200 rounded">
            <p>
              <strong>{msg.sender.userName}</strong>: {msg.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWindow
