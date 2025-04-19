import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import {
  FaHome,
  FaBook,
  FaCalendar,
  FaVideo,
  FaComments,
  FaFileAlt,
  FaStickyNote,
  FaDownload,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaCog,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa"
import { useTheme } from "../../../Context/ThemeContext"

const StudentSidebar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, to: "/studentdashboard" },
    { name: "Assignments", icon: <FaBook />, to: "/assignment" },
    { name: "Schedule", icon: <FaCalendar />, to: "/schedule" },
    { name: "Recordings", icon: <FaVideo />, to: "/recordings" },
    { name: "Discussions", icon: <FaComments />, to: "/discussions" },
    { name: "Notes", icon: <FaStickyNote />, to: "/notes" },
    { name: "Downloads", icon: <FaDownload />, to: "/downloads" },
    { name: "Classes", icon: <FaChalkboardTeacher />, to: "/classes" },
    { name: "Courses", icon: <FaGraduationCap />, to: "/courses" },
    { name: "Settings", icon: <FaCog />, to: "/settings" },
    { name: "Quiz", icon: <FaCog />, to: "/quiz" },
  ]

  const handleLogout = () => {
    navigate("/login")
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    onToggle(!isCollapsed) // Notify parent component about the state change
  }

  return (
    <div
      className={`h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } p-3 flex flex-col justify-between
      backdrop-blur-lg shadow-xl border-r
      ${
        isDarkMode
          ? "bg-[#1E293B] border-[#334155] text-[#F8FAFC]"
          : "bg-[#F3F4F6] border-[#E5E7EB] text-[#1F2937]"
      }`}
    >
      {/* Logo and Toggle */}
      <div>
        <img
          src="https://res.cloudinary.com/darbhv6uv/image/upload/v1742227008/EduNexus/logos/dbsiimjxvibjbqmqct5l.png"
          alt="EduNexus Logo"
          className={`cursor-pointer mx-auto transition-all duration-300 ${
            isCollapsed ? "w-12" : "w-36"
          }`}
          onClick={toggleSidebar}
        />

        <ul className="space-y-1 mt-6 text-sm">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center rounded-lg px-4 py-2 transition-all duration-300 font-medium ${
                    isActive
                      ? isDarkMode
                        ? "bg-green-600/20 text-green-300"
                        : "bg-[#E0F7F1] text-[#1FAA59]"
                      : isDarkMode
                      ? "hover:bg-[#334155] hover:text-green-300"
                      : "hover:bg-[#E5E7EB] hover:text-[#1E1E7E]"
                  } ${isCollapsed ? "justify-center" : "gap-3"}`
                }
              >
                <span className={`${isCollapsed ? "text-xl" : "text-base "}`}>
                  {item.icon}
                </span>
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center rounded-lg px-3 py-2 transition font-medium ${
            isDarkMode
              ? "bg-purple-700 hover:bg-purple-600 text-white"
              : "bg-purple-200 hover:bg-purple-300 text-[#1E1E7E]"
          } ${isCollapsed ? "justify-center" : "gap-3"}`}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
          {!isCollapsed && <span>Toggle Theme</span>}
        </button>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center rounded-lg px-3 py-2 transition font-medium ${
            isDarkMode
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          } ${isCollapsed ? "justify-center" : "gap-3"}`}
        >
          <FaSignOutAlt />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default StudentSidebar
