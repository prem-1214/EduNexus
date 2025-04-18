import { useTheme } from "../../../Context/ThemeContext";

const Assignment = () => {
  const { isDarkMode } = useTheme(); // Access the dark mode state
  const assignments = [
    {
      id: 1,
      title: "React Components & Props",
      dueDate: "April 10, 2025",
      status: "Pending",
    },
    {
      id: 2,
      title: "Database Schema Design",
      dueDate: "April 5, 2025",
      status: "Submitted",
    },
    {
      id: 3,
      title: "Data Structures – Trees",
      dueDate: "March 28, 2025",
      status: "Graded",
    },
  ];

  return (
    <div
      className={`p-6 pt-20 transition-all duration-300 ${
        isDarkMode ? "bg-[#1E1E2F] text-[#F8FAFC]" : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">📄 Assignments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} {...assignment} />
        ))}
      </div>
    </div>
  );
};

const AssignmentCard = ({ title, dueDate, status }) => {
  const { isDarkMode } = useTheme(); // Access the dark mode state

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return isDarkMode
          ? "bg-yellow-600 text-yellow-200"
          : "bg-yellow-400 text-yellow-900";
      case "Submitted":
        return isDarkMode
          ? "bg-blue-600 text-blue-200"
          : "bg-blue-400 text-blue-900";
      case "Graded":
        return isDarkMode
          ? "bg-green-600 text-green-200"
          : "bg-green-400 text-green-900";
      default:
        return isDarkMode
          ? "bg-gray-600 text-gray-200"
          : "bg-gray-300 text-gray-800";
    }
  };

  return (
    <div
      className={`rounded-xl shadow-md p-5 hover:shadow-xl transition-all border-l-4 ${
        isDarkMode
          ? "bg-[#1E293B] text-[#F8FAFC] border-blue-500"
          : "bg-white text-gray-800 border-blue-600"
      }`}
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm mb-3">Due: {dueDate}</p>
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
          status
        )}`}
      >
        {status}
      </span>
    </div>
  );
};

export default Assignment;
