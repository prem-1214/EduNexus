import { useState } from "react"
import { FaChalkboardTeacher, FaSearch, FaCalendarAlt } from "react-icons/fa"
import { useTheme } from "../../../Context/ThemeContext"

const classList = [
  {
    id: 1,
    title: "Web Development",
    instructor: "Prof. Sharma",
    time: "Mon & Wed, 10:00 - 11:30 AM",
    link: "#",
  },
  {
    id: 2,
    title: "Data Structures",
    instructor: "Dr. R. Mehta",
    time: "Tue & Thu, 9:00 - 10:30 AM",
    link: "#",
  },
  {
    id: 3,
    title: "Database Management",
    instructor: "Ms. I. Khan",
    time: "Friday, 2:00 - 4:00 PM",
    link: "#",
  },
]

const Classes = () => {
  const [search, setSearch] = useState("")
  const { isDarkMode } = useTheme()

  const filteredClasses = classList.filter((cls) =>
    cls.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className={`p-6 pt-20 transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">👨‍🏫 Classes</h1>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <FaSearch
          className={`absolute top-3 left-3 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
        <input
          type="text"
          placeholder="Search classes..."
          className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring ${
            isDarkMode
              ? "bg-[#1E293B] text-[#F8FAFC] border-gray-600 focus:border-blue-500"
              : "bg-white text-gray-800 border-gray-300 focus:border-blue-400"
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((cls) => <ClassCard key={cls.id} {...cls} />)
        ) : (
          <p
            className={`col-span-full ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No classes found.
          </p>
        )}
      </div>
    </div>
  )
}

const ClassCard = ({ title, instructor, time, link }) => {
  const { isDarkMode } = useTheme()
  return (
    <div
      className={`p-5 rounded-xl shadow-lg hover:shadow-2xl transition ${
        isDarkMode
          ? "bg-gradient-to-br from-indigo-900 to-violet-800 text-[#F8FAFC]"
          : "bg-gradient-to-br from-indigo-500 to-violet-700 text-white"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <FaChalkboardTeacher className="text-xl" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-sm mb-2">👨‍🏫 {instructor}</p>
      <p className="text-sm flex items-center gap-2 mb-4">
        <FaCalendarAlt /> {time}
      </p>
      <a
        href={link}
        className={`inline-block px-4 py-1 rounded transition ${
          isDarkMode
            ? "bg-[#F8FAFC] text-indigo-900 hover:bg-gray-200"
            : "bg-white text-indigo-700 hover:bg-indigo-100"
        }`}
      >
        View / Join Class
      </a>
    </div>
  )
}

export default Classes
