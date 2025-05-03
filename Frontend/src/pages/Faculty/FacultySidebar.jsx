import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext.jsx"
import Logout from "../Student/Logout/Logout.jsx"
import {
  Menu,
  Video,
  Calendar,
  Users,
  LogOut,
  FileUp,
  File,
  Upload,
  Compass,
  MessageCircleMore,
  Sun,
  Moon,
} from "lucide-react"
import { useUser } from "../../context/UserContext.jsx"

function FacultySidebar({ isOpen, setIsOpen }) {
  const { user } = useUser()
  const { isDarkMode, toggleTheme } = useTheme()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleSidebar = () => setIsOpen((prev) => !prev)

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-300 z-50
        ${isOpen ? "w-64" : "w-20"}
        ${
          isDarkMode
            ? "bg-[#111827]/60 backdrop-blur-xl text-white border-r border-[#334155]"
            : "bg-[#F1F5F9]/70 backdrop-blur-xl text-[#1F2937] border-r border-[#E5E7EB]"
        } shadow-xl rounded-tr-3xl rounded-br-3xl overflow-hidden`}
    >
      {/* Profile Section */}
      <div
        onClick={toggleSidebar}
        className={`flex items-center gap-4 p-4 border-b 
          ${isDarkMode ? "border-[#334155]" : "border-[#E5E7EB]"}
          cursor-pointer w-full`}
      >
        <img
          src={
            user?.avatar ||
            "https://res.cloudinary.com/darbhv6uv/image/upload/v1743795575/EduNexus/logos/g4phi7lpzxj8hfshian4.png"
          }
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />
        {isOpen && (
          <h2 className="text-lg font-semibold truncate font-poppins">
            {user?.userName?.replace(".", " ").toUpperCase() || "Faculty"}
          </h2>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 w-full font-inter">
        <ul className="space-y-1">
          <SidebarLink
            to="/educatorDashboard"
            icon={<Menu size={22} />}
            text="Dashboard"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/upload"
            icon={<Upload size={22} />}
            text="Upload Video"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/uploadFiles"
            icon={<FileUp size={22} />}
            text="Upload Files"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/my-files"
            icon={<File size={22} />}
            text="My Files"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/uploadedVideos"
            icon={<Video size={22} />}
            text="Uploaded Videos"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/exploreVideos"
            icon={<Compass size={22} />}
            text="Explore Videos"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/connect"
            icon={<MessageCircleMore size={22} />}
            text="Connect"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/Calender"
            icon={<Calendar size={22} />}
            text="Calendar"
            isOpen={isOpen}
          />
          <SidebarLink
            to="/total-students"
            icon={<Users size={22} />}
            text="Students"
            isOpen={isOpen}
          />
        </ul>
      </nav>

      {/* Bottom Controls */}
      <div
        className={`p-4 border-t space-y-2 
          ${isDarkMode ? "border-[#334155]" : "border-[#E5E7EB]"}`}
      >
        {/* Toggle Theme */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 w-full py-2 px-4 rounded-lg transition text-sm font-medium
            ${
              isDarkMode
                ? "bg-[#1FAA59]/80 hover:bg-[#16A34A]/80 text-white"
                : "bg-[#1FAA59] hover:bg-[#16A34A] text-white"
            }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          {isOpen && <span>Toggle Theme</span>}
        </button>

        {/* Logout */}
        <button
          onClick={Logout}
          className={`flex items-center gap-2 w-full py-2 px-4 rounded-lg transition text-sm font-medium
            ${
              isDarkMode
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
        >
          <LogOut size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

function SidebarLink({ to, icon, text, isOpen }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center py-2 rounded-lg transition-all duration-200 text-sm font-medium
          ${isOpen ? "px-6 gap-3" : "justify-center"}
          ${
            isActive
              ? "bg-[#E0F7F1] dark:bg-[#1FAA59]/30 text-[#1E1E7E] dark:text-white"
              : "hover:bg-[#E5E7EB] dark:hover:bg-[#1E1E2F] text-[#374151] dark:text-[#F8FAFC]"
          }`
        }
      >
        {icon}
        {isOpen && <span>{text}</span>}
      </NavLink>
    </li>
  )
}

export default FacultySidebar
