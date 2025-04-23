import { FaUser, FaEnvelope, FaLock, FaBell, FaSave } from "react-icons/fa"
import { useTheme } from "../../../context/ThemeContext"

const Settings = () => {
  const { isDarkMode } = useTheme()
  return (
    <div
      className={`p-6 pt-20 transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      {/* Profile Settings */}
      <div
        className={`rounded-xl shadow p-6 mb-8 ${
          isDarkMode ? "bg-[#1E293B] text-[#F8FAFC]" : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaUser /> Profile Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Change Name"
            className={`border p-2 rounded focus:ring w-full ${
              isDarkMode
                ? "bg-[#1E293B] text-[#F8FAFC] border-gray-600 focus:border-blue-500"
                : "bg-white text-gray-800 border-gray-300 focus:border-blue-400"
            }`}
          />
          <input
            type="email"
            placeholder="Change Email"
            className={`border p-2 rounded focus:ring w-full ${
              isDarkMode
                ? "bg-[#1E293B] text-[#F8FAFC] border-gray-600 focus:border-blue-500"
                : "bg-white text-gray-800 border-gray-300 focus:border-blue-400"
            }`}
          />
          <input
            type="password"
            placeholder="Change Password"
            className={`border p-2 rounded focus:ring w-full ${
              isDarkMode
                ? "bg-[#1E293B] text-[#F8FAFC] border-gray-600 focus:border-blue-500"
                : "bg-white text-gray-800 border-gray-300 focus:border-blue-400"
            }`}
          />
        </div>
      </div>

      {/* Notifications */}
      <div
        className={`rounded-xl shadow p-6 mb-8 ${
          isDarkMode ? "bg-[#1E293B] text-[#F8FAFC]" : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaBell /> Notifications
        </h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className={`form-checkbox h-5 w-5 ${
              isDarkMode ? "text-blue-500" : "text-blue-600"
            }`}
          />
          <span>Enable email notifications</span>
        </label>
        <label className="flex items-center space-x-3 mt-2">
          <input
            type="checkbox"
            className={`form-checkbox h-5 w-5 ${
              isDarkMode ? "text-blue-500" : "text-blue-600"
            }`}
          />
          <span>Enable class reminders</span>
        </label>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className={`flex items-center gap-2 px-6 py-2 rounded shadow transition ${
            isDarkMode
              ? "bg-green-700 hover:bg-green-600 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          <FaSave /> Save Settings
        </button>
      </div>
    </div>
  )
}

export default Settings
