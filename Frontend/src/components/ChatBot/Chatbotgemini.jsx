import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCommentDots, FaTimes } from "react-icons/fa"
import ReactMarkdown from "react-markdown"

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY // or hardcode for testing

const ChatbotWidgetGemini = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [userInput, setUserInput] = useState("")
  const isLoading = useRef(false)

  const handleSend = async () => {
    if (!userInput.trim() || isLoading.current) return

    const newMessages = [...messages, { role: "user", content: userInput }]
    setMessages(newMessages)
    setUserInput("")
    isLoading.current = true

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
                You are an AI assistant built for an LMS platform. Only respond to educational queries across subjects like science, history, language, math, computer science, and general knowledge (including health & nutrition). 
                
                For example:
                - "What is CO2?" → valid (science)
                - "How many calories in pizza?" → valid (nutrition education)
                - "How to invest in crypto?" → invalid (non-educational)
                
                If a query is unrelated to education, respond with:
                "Sorry, I can only guide you with educational questions."
                
                Now respond to: ${userInput}
                        `,
                  },
                ],
              },
            ],
          }),
        }
      )

      const data = await res.json()
      const response =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response"

      setMessages((prev) => [...prev, { role: "bot", content: response }])
    } catch (err) {
      console.error("Gemini Error:", err)
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error talking to Gemini bot." },
      ])
    } finally {
      isLoading.current = false
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700"
        >
          {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 w-80 max-h-[70vh] bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-lg rounded-lg z-50 flex flex-col"
          >
            <div className="p-3 font-semibold text-gray-700 dark:text-white border-b dark:border-gray-700">
              EduNexus Gemini Chatbot
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2 text-sm space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg max-w-[80%] whitespace-pre-wrap break-words ${
                    msg.role === "user"
                      ? "bg-green-100 dark:bg-green-800 ml-auto text-right"
                      : "bg-gray-100 dark:bg-gray-800 mr-auto text-left"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              ))}
            </div>
            <div className="flex p-2 border-t dark:border-gray-700">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-2 py-1 rounded-l border dark:bg-gray-800 dark:text-white"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSend}
                className="bg-green-600 text-white px-3 py-1 rounded-r hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatbotWidgetGemini