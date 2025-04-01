import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import LogoutHandler from "../components/Logout/Logout.jsx";

function FacultySidebar() {
  const { user } = useUser();

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 text-center border-b border-blue-700">
        <h2 className="text-2xl font-bold">
          {user?.userName || "Faculty"}'s Dashboard
        </h2>
        <p className="text-sm mt-1">Welcome to your workspace!</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/facultyDashboard"
              className="block py-2 px-4 rounded hover:bg-blue-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/upload"
              className="block py-2 px-4 rounded hover:bg-blue-700"
            >
              Upload Video
            </Link>
          </li>
          <li>
            <Link
              to="/videos"
              className="block py-2 px-4 rounded hover:bg-blue-700"
            >
              Videos
            </Link>
          </li>
          <li>
            <Link
              to="/total-students"
              className="block py-2 px-4 rounded hover:bg-blue-700"
            >
              Students
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-700">
        <button onClick={LogoutHandler} className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default FacultySidebar;