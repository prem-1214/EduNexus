import { useState } from "react"
import { useTheme } from "../../../Context/ThemeContext"

const Discussion = () => {
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      author: "Riya Patel",
      question:
        "Can someone explain the difference between props and state in React?",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Karan Mehta",
      question: "Is the assignment 3 submission date extended?",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      author: "Sneha Rao",
      question: "Any recommended resources for learning MongoDB basics?",
      timestamp: "1 day ago",
    },
  ])

  const { isDarkMode } = useTheme()

  return (
    <div
      className={`p-6 pt-20 transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">💬 Discussion Forum</h1>
      <p className={`mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        Ask questions, help others, and grow together!
      </p>

      <div className="space-y-4">
        {discussions.map((post) => (
          <DiscussionPost
            key={post.id}
            author={post.author}
            question={post.question}
            timestamp={post.timestamp}
          />
        ))}
      </div>
    </div>
  )
}

const DiscussionPost = ({ author, question, timestamp }) => {
  const { isDarkMode } = useTheme()

  return (
    <div
      className={`rounded-xl shadow-md p-4 border-l-4 hover:shadow-lg transition-all ${
        isDarkMode
          ? "bg-[#1E293B] text-[#F8FAFC] border-blue-500"
          : "bg-white text-gray-800 border-blue-600"
      }`}
    >
      <h2
        className={`text-lg font-semibold ${
          isDarkMode ? "text-blue-300" : "text-blue-800"
        }`}
      >
        {question}
      </h2>
      <div
        className={`text-sm mt-1 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Posted by <span className="font-medium">{author}</span> • {timestamp}
      </div>
    </div>
  )
}

export default Discussion
