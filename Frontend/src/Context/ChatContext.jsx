import { createContext, useContext, useState, useEffect } from "react"
import { io } from "socket.io-client"

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [socket] = useState(() => io(import.meta.env.VITE_BACKEND_API_URL))

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id)
    })

    return () => socket.disconnect()
  }, [])

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        messages,
        setMessages,
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
