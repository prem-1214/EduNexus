import { FaUser, FaEnvelope, FaLock, FaBell, FaSave } from "react-icons/fa"

const Settings = () => {
  return (
    <div className="p-6 pt-20 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaUser /> Profile Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Change Name"
            className="border p-2 rounded focus:ring w-full"
          />
          <input
            type="email"
            placeholder="Change Email"
            className="border p-2 rounded focus:ring w-full"
          />
          <input
            type="password"
            placeholder="Change Password"
            className="border p-2 rounded focus:ring w-full"
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaBell /> Notifications
        </h2>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Enable email notifications</span>
        </label>
        <label className="flex items-center space-x-3 mt-2">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Enable class reminders</span>
        </label>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition">
          <FaSave /> Save Settings
        </button>
      </div>
    </div>
  )
}

export default Settings
