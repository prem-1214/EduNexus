import { useState } from "react"
import { useTheme } from "../../../Context/ThemeContext"

const Schedule = () => {
  const [isConnected, setIsConnected] = useState(false)
  const { isDarkMode } = useTheme()

  return (
    <div
      className={`p-6 pt-20 transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">📆 Your Schedule</h1>
      <p className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
        View and manage your events using Google Calendar integration.
      </p>

      {!isConnected ? (
        <div
          className={`p-6 rounded-xl shadow-sm text-center transition-all duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-900 to-blue-800 border border-blue-700 text-blue-200"
              : "bg-gradient-to-r from-blue-200 to-blue-100 border border-blue-300 text-blue-900"
          }`}
        >
          <p className="text-lg font-medium mb-4">
            Connect your Google Calendar to get started!
          </p>
          <button
            onClick={() => setIsConnected(true)}
            className={`px-5 py-2 rounded-lg transition ${
              isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Connect Calendar
          </button>
        </div>
      ) : (
        <div className="mt-6">
          {/* Google Calendar iFrame will appear here */}
          <iframe
            title="Google Calendar"
            src="https://calendar.google.com/calendar/embed?src=your_calendar_id%40group.calendar.google.com&ctz=Asia%2FKolkata"
            style={{ border: 0 }}
            className={`w-full h-[600px] rounded-lg shadow-lg ${
              isDarkMode ? "bg-[#1E293B]" : "bg-white"
            }`}
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      )}
    </div>
  )
}

export default Schedule
