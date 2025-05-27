import { useNavigate } from "react-router-dom"
import { useTheme } from "../../../Context/ThemeContext.jsx"
import { useUser } from "../../../Context/UserContext.jsx"

const StudentDashboardPage = ({ isSidebarCollapsed }) => {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const { user } = useUser()

  const cards = [
    {
      title: "Total Courses",
      value: "06",
      color: "from-blue-500 to-blue-700",
      to: "/courses",
    },
    {
      title: "Pending Assignments",
      value: "03",
      color: "from-yellow-400 to-yellow-600",
      to: "/assignment",
    },
    {
      title: "Upcoming Classes",
      value: "02",
      color: "from-green-500 to-green-700",
      to: "/classes",
    },
    {
      title: "New Messages",
      value: "05",
      color: "from-purple-500 to-purple-700",
      to: "/discussions",
    },
  ]

  return (
    <div
      className={`p-6 transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">
        Welcome {user?.userName?.replace(".", " ").toUpperCase() || "Student"}{" "}
        to Your Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card, idx) => (
          <DashboardCard
            key={idx}
            title={card.title}
            value={card.value}
            gradient={card.color}
            onClick={() => navigate(card.to)}
          />
        ))}
      </div>

      <div
        className={`rounded-xl p-6 shadow-md ${
          isDarkMode ? "bg-[#1E293B] text-[#F8FAFC]" : "bg-white text-gray-700"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">📢 Announcements</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Mid-sem exam schedule will be uploaded soon.</li>
          <li>Assignment 3 deadline extended to April 10th.</li>
          <li>New course on AI Ethics launched.</li>
        </ul>
      </div>
    </div>
  )
}

const DashboardCard = ({ title, value, gradient, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-6 text-white shadow-xl bg-gradient-to-r ${gradient}
        transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <h3 className="text-sm opacity-90">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}

export default StudentDashboardPage
