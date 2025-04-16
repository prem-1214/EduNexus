import { useState } from "react"

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

  return (
    <div className="p-6 pt-20">
      <h1 className="text-3xl font-bold mb-4">💬 Discussion Forum</h1>
      <p className="text-gray-600 mb-8">
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
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-all">
      <h2 className="text-lg font-semibold text-blue-800">{question}</h2>
      <div className="text-sm text-gray-600 mt-1">
        Posted by <span className="font-medium">{author}</span> • {timestamp}
      </div>
    </div>
  )
}

export default Discussion
