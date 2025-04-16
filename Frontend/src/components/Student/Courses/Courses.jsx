import { useState } from "react"
import { FaSearch, FaGraduationCap, FaClock, FaUser } from "react-icons/fa"

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

  const filteredCourses = courseList.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📚 Courses</h1>

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
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
          <p className="text-gray-500 col-span-full">No courses found.</p>
        )}
      </div>
    </div>
  )
}

const CourseCard = ({ title, instructor, duration, link }) => {
  return (
    <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition">
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
        className="inline-block bg-white text-green-700 px-4 py-1 rounded hover:bg-green-100 transition"
      >
        View Course
      </a>
    </div>
  )
}

export default Courses
