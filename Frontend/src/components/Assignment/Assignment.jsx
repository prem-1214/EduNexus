import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const assignments = [
  { title: "Conducting User Research", course: "User Research and Per...", dueDate: "July 1, 2024", status: "Done", submit: "Submitted" },
  { title: "Competitive Analysis Report", course: "Competitive Analysis in...", dueDate: "July 25, 2024", status: "Progress", submit: "Upload" },
  { title: "Creating Wireframes", course: "Wireframing and Protot...", dueDate: "August 1, 2024", status: "Progress", submit: "Upload" },
  { title: "Usability Testing and Feedback", course: "Usability Testing and It...", dueDate: "August 22, 2024", status: "Pending", submit: "Upload" },
  { title: "Developing Visual Design", course: "Visual Design and Bran...", dueDate: "August 29, 2024", status: "Pending", submit: "Upload" },
  { title: "Creating a Design System", course: "Design Systems and C...", dueDate: "September 5, 2024", status: "Pending", submit: "Upload" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Done": return "bg-green-200 text-green-700";
    case "Progress": return "bg-blue-200 text-blue-700";
    case "Pending": return "bg-red-200 text-red-700";
    default: return "bg-gray-200 text-gray-700";
  }
};

const Assignments = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex-1 p-6 pl-20 md:pl-64 overflow-y-auto overflow-x-hidden">
        <Navbar />
        <h1 className="text-2xl font-bold mt-4">Assignments</h1>
        <p className="text-gray-600">View and manage your course assignments</p>

        <div className="mt-4 bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3">Assignment Title</th>
                <th className="p-3">Course/Lessons</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Submit</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3">{assignment.title}</td>
                  <td className="p-3">{assignment.course}</td>
                  <td className="p-3">{assignment.dueDate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="p-3 text-blue-500 cursor-pointer">{assignment.submit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            Show
            <select className="border mx-2 p-1 rounded">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            Rows
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded">Prev</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">...</button>
            <button className="px-3 py-1 border rounded">10</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments; 