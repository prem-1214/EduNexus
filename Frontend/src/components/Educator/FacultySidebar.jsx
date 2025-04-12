import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import Logout from "../../pages/Logout.jsx";
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
  Sun,
  Moon,
} from "lucide-react";

function FacultySidebar({ isOpen, setIsOpen }) {
  const { user } = useUser();
  // const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-violet-200 to-purple-200 dark:from-gray-900 dark:to-gray-800 
      text-gray-800 dark:text-white flex flex-col shadow-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-20 items-center"
      }`}
    >
      {/* Profile & Toggle */}
      <div
        onClick={toggleSidebar}
        className="flex items-center gap-4 p-4 border-b border-violet-300 dark:border-gray-700 cursor-pointer w-full"
      >
        <img
          src={
            user?.avatar ||
            "https://res.cloudinary.com/darbhv6uv/image/upload/v1743795575/EduNexus/logos/g4phi7lpzxj8hfshian4.png"
          }
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        {isOpen && (
          <h2 className="text-lg font-semibold truncate">
            {user?.userName?.replace(".", " ").toUpperCase() || "Faculty"}
          </h2>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 w-full">
        <ul className="space-y-1">
          <SidebarLink to="/educatorDashboard" icon={<Menu size={22} />} text="Dashboard" isOpen={isOpen} />
          <SidebarLink to="/upload" icon={<Upload size={22} />} text="Upload Video" isOpen={isOpen} />
          <SidebarLink to="/uploadFiles" icon={<FileUp size={22} />} text="Upload Files" isOpen={isOpen} />
          <SidebarLink to="/my-files" icon={<File size={22} />} text="My Files" isOpen={isOpen} />
          <SidebarLink to="/uploadedVideos" icon={<Video size={22} />} text="Uploaded Videos" isOpen={isOpen} />
          <SidebarLink to="/exploreVideos" icon={<Compass size={22} />} text="Explore Videos" isOpen={isOpen} />
          <SidebarLink to="/Calender" icon={<Calendar size={22} />} text="Calendar" isOpen={isOpen} />
          <SidebarLink to="/total-students" icon={<Users size={22} />} text="Students" isOpen={isOpen} />
        </ul>
      </nav>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-violet-300 dark:border-gray-700 w-full space-y-2">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 w-full py-2 px-4 bg-purple-400 dark:bg-purple-700 hover:bg-purple-500 dark:hover:bg-purple-600 text-white rounded transition"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          {isOpen && <span className="text-sm font-medium">Toggle Theme</span>}
        </button>

        <button
          onClick={Logout}
          className="flex items-center gap-2 w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded transition"
        >
          <LogOut size={18} />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon, text, isOpen }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center ${
            isOpen ? "justify-start gap-3 px-6" : "justify-center"
          } py-2 rounded transition text-sm font-medium ${
            isActive
              ? "bg-purple-300 dark:bg-gray-700"
              : "hover:bg-purple-200 dark:hover:bg-gray-700"
          }`
        }
      >
        {icon}
        {isOpen && <span>{text}</span>}
      </NavLink>
    </li>
  );
}

export default FacultySidebar;
