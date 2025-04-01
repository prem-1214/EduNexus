import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalStudents = () => {
  const [students, setStudents] = useState([]); // State to store the list of students
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch students from the backend
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/video/students"); // Backend route
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Students</h1>
        <p className="text-gray-600 mt-2">
          List of all students with their email and username.
        </p>
      </header>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Username</th>
            <th className="py-3 px-6 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-3 px-6">{student.userName}</td>
              <td className="py-3 px-6">{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalStudents;