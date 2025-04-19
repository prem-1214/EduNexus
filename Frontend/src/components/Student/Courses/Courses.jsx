import { useState } from "react"
import { FaSearch, FaGraduationCap, FaClock, FaUser } from "react-icons/fa"
import { useTheme } from "../../../Context/ThemeContext"

const courseList = [
  {
    id: 1,
    title: "React.js Fundamentals",
    instructor: "Mr. Rakesh Patel",
    duration: "6 Weeks",
    link: "#",
  },
  {
    id: 2,
    title: "Data Science with Python",
    instructor: "Dr. Nidhi Joshi",
    duration: "8 Weeks",
    link: "#",
  },
  {
    id: 3,
    title: "Cybersecurity Basics",
    instructor: "Prof. Sneha Shah",
    duration: "4 Weeks",
    link: "#",
  },
]

const Courses = () => {
  const [search, setSearch] = useState("")
  const { isDarkMode } = useTheme()

  const filteredCourses = courseList.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className={`p-6 pt-20 transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">📚 Courses</h1>

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <FaSearch
          className={`absolute top-3 left-3 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
        <input
          type="text"
          placeholder="Search courses..."
          className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring ${
            isDarkMode
              ? "bg-[#1E293B] text-[#F8FAFC] border-gray-600 focus:border-blue-500"
              : "bg-white text-gray-800 border-gray-300 focus:border-blue-400"
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))
        ) : (
          <p
            className={`col-span-full ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No courses found.
          </p>
        )}
      </div>
    </div>
  )
}

const CourseCard = ({ title, instructor, duration, link }) => {
  const { isDarkMode } = useTheme()

  return (
    <div
      className={`p-5 rounded-xl shadow-lg hover:shadow-2xl transition ${
        isDarkMode
          ? "bg-gradient-to-br from-green-900 to-teal-800 text-[#F8FAFC]"
          : "bg-gradient-to-br from-green-500 to-teal-600 text-white"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <FaGraduationCap className="text-xl" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-sm flex items-center gap-2">
        <FaUser /> {instructor}
      </p>
      <p className="text-sm flex items-center gap-2 mb-4">
        <FaClock /> {duration}
      </p>
      <a
        href={link}
        className={`inline-block px-4 py-1 rounded transition ${
          isDarkMode
            ? "bg-[#F8FAFC] text-green-900 hover:bg-gray-200"
            : "bg-white text-green-700 hover:bg-green-100"
        }`}
      >
        View Course
      </a>
    </div>
  )
}

export default Courses
