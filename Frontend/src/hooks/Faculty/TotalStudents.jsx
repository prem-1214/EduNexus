import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/video/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
          Loading students...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-purple-200 to-blue-200 dark:from-gray-900 dark:to-gray-800 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 drop-shadow-lg">
          Students
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
          List of all registered students and their contact details.
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-violet-600 dark:bg-gray-800 text-white dark:text-gray-300 text-left">
            <tr>
              <th className="py-4 px-6 text-sm font-medium">Username</th>
              <th className="py-4 px-6 text-sm font-medium">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                } hover:bg-violet-50 dark:hover:bg-gray-700 transition-all`}
              >
                <td className="py-3 px-6 text-gray-800 dark:text-gray-100 font-medium">
                  {student.userName}
                </td>
                <td className="py-3 px-6 text-gray-700 dark:text-gray-300">
                  {student.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalStudents;