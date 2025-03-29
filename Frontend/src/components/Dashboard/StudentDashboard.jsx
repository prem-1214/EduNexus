import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve token from localStorage
        const response = await axios.get("/user/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        });
        setUser(response.data);
        console.log("User:", response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    // Call the async function
    fetchUser();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  console.log("User:", user);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex-1 p-6 pt-20 md:pl-64 overflow-y-auto overflow-x-hidden bg-gray-50">
        <Navbar />

        {/* Header */}
        <h1 className="text-2xl font-bold mt-6">
          Hello {user.userName || "User"} 👋
        </h1>
        <p className="text-gray-600">Let’s learn something new today!</p>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Recent Enrolled Course */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">Recent Enrolled Course</h3>
            <p>Product Design Course</p>
            <div className="w-full bg-gray-200 h-2 rounded mt-2">
              <div className="bg-blue-500 h-2 w-1/3 rounded"></div>
            </div>
            <p className="text-sm text-gray-500">14/30 classes</p>
          </div>

          {/* Resources */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">Your Resources</h3>
            <ul className="text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Auto-layout.pdf</span>
                <span>8.5 MB</span>
              </li>
              <li className="flex justify-between">
                <span>Design_Tips.png</span>
                <span>2.5 MB</span>
              </li>
            </ul>
            <p className="text-blue-500 text-sm mt-2 cursor-pointer">See more</p>
          </div>

          {/* Calendar (Placeholder) */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">Calendar</h3>
            <p className="text-gray-500">[Add Calendar Component Here]</p>
          </div>

          {/* Hours Spent */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">Hours Spent</h3>
            <p className="text-gray-500">[Graph Component Placeholder]</p>
          </div>

          {/* Performance */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">Performance</h3>
            <p className="text-gray-500">Assignment Submission: 8.9/10</p>
          </div>

          {/* To-Do List */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">To-Do List</h3>
            <ul className="text-gray-600">
              <li>✅ Design System Basics</li>
              <li>❌ Introduction to UI</li>
            </ul>
          </div>

          {/* Recent Enrolled Classes */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">Recent Enrolled Classes</h3>
            <p className="text-gray-500">UX Design, Visual Design</p>
          </div>

          {/* Upcoming Lessons */}
          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-semibold">Upcoming Lesson</h3>
            <p className="text-sm">UX Design Fundamentals - 5:30 PM</p>
            <button className="bg-green-500 text-white px-4 py-1 mt-2 rounded">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;