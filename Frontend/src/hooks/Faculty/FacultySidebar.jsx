import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import Logout from "../../components/Logout/Logout.jsx";
import { Menu, Video, Calendar, Users, LogOut, Upload } from "lucide-react";

function FacultySidebar() {
  const { user } = useUser();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-violet-900 to-violet-700 text-white flex flex-col p-4 shadow-lg">
      {/* Profile Section */}
      <div className="flex items-center space-x-3 p-4 border-b border-violet-600">
        <img
          src={user?.profilePic || "https://via.placeholder.com/40"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <h2 className="text-lg font-semibold">{user?.userName?.replace(".", " ").toUpperCase() || "Faculty"}</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-3">
          <SidebarLink to="/educatorDashboard" icon={<Menu />} text="Dashboard" />
          <SidebarLink to="/upload" icon={<Upload />} text="Upload Video" />
          <SidebarLink to="/videos" icon={<Video />} text="Uploaded Videos" />
          <SidebarLink to="/Calender" icon={<Calendar />} text="Calendar" />
          <SidebarLink to="/total-students" icon={<Users />} text="Students" />
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-violet-600">
        <button
          onClick={Logout}
          className="flex items-center space-x-2 w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded transition"
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({ to, icon, text }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center space-x-3 py-2 px-4 rounded hover:bg-violet-800 transition"
      >
        {icon}
        <span className="text-sm font-medium">{text}</span>
      </Link>
    </li>
  );
}

export default FacultySidebar;
