import { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext.jsx"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function FacultyDashboardPage() {
  const { user } = useUser();
  const [totalStudents, setTotalStudents] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {

    if (!user) {
      navigate("/login")
    }
    const fetchTotalStudents = async () => {
      try {
        const response = await axios.get("/video/total-students", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
          },
        })
        setTotalStudents(response.data.totalStudents);
        console.log("Total Students:", response.data.totalStudents)
      } catch (error) {
        console.error("Error fetching total students:", error)
      }finally {
        setLoading(false)
      }
    }

    fetchTotalStudents()
  }, [user, navigate])

  if(loading) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {user?.userName?.split('.')[0].toUpperCase() || "Faculty"}'s Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Here you can manage your courses, assignments, and resources.
          </p>
        </header>

        {/* Total Students Section */}
        <Link to="/total-students" className="mb-8">
        <section id="total-students" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Total Students
          </h2>
          <div className="bg-white p-6 shadow rounded">
            <p className="text-4xl font-bold text-blue-600">{totalStudents}</p>
            <p className="text-gray-600 mt-2">students are currently enrolled.</p>
          </div>
        </section>
        </Link>

        {/* Manage Courses Section */}
        <section id="manage-courses" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Manage Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-semibold text-lg">Course 1</h3>
              <p className="text-gray-600 mt-2">
                Manage course materials, assignments, and students.
              </p>
              <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-semibold text-lg">Course 2</h3>
              <p className="text-gray-600 mt-2">
                Manage course materials, assignments, and students.
              </p>
              <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="font-semibold text-lg">Course 3</h3>
              <p className="text-gray-600 mt-2">
                Manage course materials, assignments, and students.
              </p>
              <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        </section>

        {/* Assignments Section */}
        <section id="assignments" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Assignments
          </h2>
          <p className="text-gray-600">
            View and manage assignments for your courses.
          </p>
          <button
            className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            aria-label="Create New Assignment"
          >
            Create New Assignment
          </button>
        </section>

        {/* Resources Section */}
        <section id="resources" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Resources
          </h2>
          <p className="text-gray-600">
            Upload and manage resources for your students.
          </p>
          <button
            className="mt-4 py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-600"
            aria-label="Upload Resource"
          >
            Upload Resource
          </button>
        </section>

        {/* Profile Section */}
        <section id="profile">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Profile
          </h2>
          <p className="text-gray-600">
            Update your profile information and settings.
          </p>
          <button
            className="mt-4 py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            aria-label="Edit Profile"
          >
            Edit Profile
          </button>
        </section>
      </main>
    </div>
  );
}

export default FacultyDashboardPage