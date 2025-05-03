import React, { useEffect, useState } from "react"
import { useChat } from "../../Context/ChatContext.jsx"
import { useUser } from "../../context/UserContext.jsx"
import api from "../../utils/axiosInstance.js"

const Sidebar = () => {
  const { selectedChat, setSelectedChat, socket } = useChat()
  const { user } = useUser()

  const [chats, setChats] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Fetch chats from backend
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await api.get("/chat/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        setChats(data)
        console.log("Fetched chats:", data)
      } catch (error) {
        console.error("Failed to load chats", error)
      }
    }

    if (user) fetchChats()
  }, [user])

  // Emit user setup on socket
  useEffect(() => {
    if (user) {
      socket.emit("setup", user)
    }
  }, [socket, user])

  // Handle search
  useEffect(() => {
    const search = async () => {
      if (!searchTerm) {
        setSearchResults([])
        return
      }

      try {
        const { data } = await api.get(`/chat/search?query=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        setSearchResults(data)
      } catch (err) {
        console.error("Search failed", err)
      }
    }

    const delayDebounce = setTimeout(() => {
      search()
    }, 300) // debounce

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat)
  }

  const renderChats = () => {
    return chats.map((chat) => {
      const otherUser = chat.isGroupChat
        ? chat.chatName
        : chat.users.find((u) => u._id !== user._id)?.userName || "Unknown"

      return (
        <div
          key={chat._id}
          onClick={() => handleSelectChat(chat)}
          className={`p-3 rounded-md cursor-pointer ${
            selectedChat?._id === chat._id
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <div className="font-medium truncate">{otherUser}</div>
        </div>
      )
    })
  }

  return (
    <div className="w-full md:w-1/3 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Chats
      </h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search user by email or username"
        className="w-full p-2 mb-4 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Search Results:
          </h4>
          {searchResults.map((u) => (
            <div
              key={u._id}
              onClick={async () => {
                try {
                  const { data } = await api.post(
                    "/chat",
                    { userId: u._id },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "accessToken"
                        )}`,
                      },
                    }
                  )
                  setSelectedChat(data)
                  if (!chats.find((c) => c._id === data._id)) {
                    setChats((prev) => [data, ...prev])
                  }
                  setSearchTerm("")
                  setSearchResults([])
                } catch (err) {
                  console.error("Error accessing chat", err)
                }
              }}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              {u.userName} ({u.email})
            </div>
          ))}
        </div>
      )}

      {/* Chats List */}
      <div className="space-y-2">{renderChats()}</div>
    </div>
  )
}

export default Sidebar
