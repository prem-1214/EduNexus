import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import Logout from "../../components/Logout/Logout.jsx";

function FacultySidebar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false); // State to toggle the sidebar

  return (
    <>
      {/* Sidebar for larger screens */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white flex flex-col transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50`}
      >
        {/* Header */}
        <div className="p-6 text-center border-b border-blue-700">
          <h2 className="text-2xl font-bold">
            {user?.userName || "Faculty"}'s Dashboard
          </h2>
          <p className="text-sm mt-1">Welcome to your workspace!</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-4">
            <li>
              <Link
                to="/educatorDashboard"
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
                to="/Calender"
                className="block py-2 px-4 rounded hover:bg-blue-700"
              >
                Calender
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
          <button
            onClick={Logout}
            className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Hamburger Menu for smaller screens */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white text-black p-2  rounded-xl border-4 border-blue-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "<" : ">"}
      </button>
    </>
  );
}

export default FacultySidebar;