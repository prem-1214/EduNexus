import { useState } from "react";
import { FaHome, FaBook, FaCalendar, FaVideo, FaComments, FaFileAlt, FaStickyNote, FaDownload, FaChalkboardTeacher, FaGraduationCap, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const Navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, to: "/dashboard" },
    { name: "Assignments", icon: <FaBook />, to: "/assignment" },
    { name: "Schedule", icon: <FaCalendar />, to: "/schedule" },
    { name: "Recordings", icon: <FaVideo />, to: "/recordings" },
    { name: "Discussions", icon: <FaComments />, to: "/discussions" },
    { name: "Resources", icon: <FaFileAlt />, to: "/resources" },
    { name: "Notes", icon: <FaStickyNote />, to: "/notes" },
    { name: "Downloads", icon: <FaDownload />, to: "/downloads" },
    { name: "Classes", icon: <FaChalkboardTeacher />, to: "/classes" },
    { name: "Courses", icon: <FaGraduationCap />, to: "/courses" },
    { name: "Settings", icon: <FaCog />, to: "/settings" }
  ];

  return (
    <div className={`h-screen bg-gray-100 p-2 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} fixed left-0 top-0`}>
      <img 
        src="https://res.cloudinary.com/darbhv6uv/image/upload/v1742227008/EduNexus/logos/dbsiimjxvibjbqmqct5l.png" 
        alt="EduNexus Logo" 
        className={`cursor-pointer transition-all duration-300 mx-auto ${isCollapsed ? 'w-12' : 'w-32'} h-auto mb-4`} 
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      <ul className="mt-2 w-full">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink 
              to={item.to} 
              className={({ isActive }) => `flex items-center p-2 rounded transition-all duration-300 cursor-pointer ${
                isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-200 hover:text-black'
              } ${isCollapsed ? 'justify-center' : 'pl-4'}`}
            >
              {item.icon}
              {!isCollapsed && <span className="ml-2">{item.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Sidebar;