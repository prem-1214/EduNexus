import { useState } from "react"

const Schedule = () => {
  const [isConnected, setIsConnected] = useState(false)

  return (
    <div className="p-6 pt-20">
      <h1 className="text-3xl font-bold mb-4">📆 Your Schedule</h1>
      <p className="text-gray-600 mb-6">
        View and manage your events using Google Calendar integration.
      </p>

      {!isConnected ? (
        <div className="bg-gradient-to-r from-blue-200 to-blue-100 border border-blue-300 p-6 rounded-xl shadow-sm text-center">
          <p className="text-lg font-medium mb-4">
            Connect your Google Calendar to get started!
          </p>
          <button
            onClick={() => setIsConnected(true)} // replace with real auth later
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
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
            className="w-full h-[600px] rounded-lg shadow-lg"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      )}
    </div>
  )
}

export default Schedule
