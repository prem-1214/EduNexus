import { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext.jsx"
import ChatbotWidget from "../../components/ChatBot/ChatbotWidget.jsx"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../srcStyle/components/ui/card.jsx"
import { Button } from "../../../srcStyle/components/ui/button.jsx"
import { Skeleton } from "../../../srcStyle/components/ui/skeleton.jsx"

function FacultyDashboardPage() {
  const { user } = useUser()
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
        setTotalStudents(response.data.totalStudents)
      } catch (error) {
        console.error("Error fetching total students:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTotalStudents()
  }, [user, navigate])

  return (
    <div className="flex h-screen bg-[#F9FAFB] dark:bg-[#1E1E2F] text-[#1F2937] dark:text-[#F8FAFC]">
      <main
        className={`transition-all duration-300 flex-1 px-6 pt-8 overflow-y-auto ${
          user?.isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <header className="mb-8">
          <h1 className="text-4xl font-poppins font-semibold text-[#1E1E7E] dark:text-white">
            Welcome,{" "}
            {user?.userName?.replace(".", " ").toUpperCase() || "Faculty"} 👋
          </h1>
          <p className="mt-2 text-base text-[#374151] dark:text-[#94A3B8]">
            Manage your courses, assignments, and students efficiently.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChatbotWidget />
          <Link to="/total-students">
            <Card className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] backdrop-blur-xl rounded-2xl shadow-lg hover:scale-[1.02] transition-all">
              <CardHeader>
                <CardTitle className="text-[#1E1E7E] dark:text-[#F8FAFC]">
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <p className="text-5xl font-bold text-[#1FAA59] dark:text-[#28A745]">
                    {totalStudents}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] backdrop-blur-xl rounded-2xl shadow-lg hover:scale-[1.02] transition-all">
            <CardHeader>
              <CardTitle className="text-[#1E1E7E] dark:text-[#F8FAFC]">
                Manage Courses 📚
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#374151] dark:text-[#94A3B8]">
                Edit and update your course materials.
              </p>
              <Button className="mt-4 w-full bg-[#1E1E7E] hover:bg-[#3742fa] text-white">
                View Courses
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] backdrop-blur-xl rounded-2xl shadow-lg hover:scale-[1.02] transition-all">
            <CardHeader>
              <CardTitle className="text-[#1E1E7E] dark:text-[#F8FAFC]">
                Assignments ✍️
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#374151] dark:text-[#94A3B8]">
                Create and manage assignments.
              </p>
              <Button className="mt-4 w-full bg-[#1FAA59] hover:bg-[#16A34A] text-white">
                Create Assignment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] backdrop-blur-xl rounded-2xl shadow-lg hover:scale-[1.02] transition-all">
            <CardHeader>
              <CardTitle className="text-[#1E1E7E] dark:text-[#F8FAFC]">
                Resources 📁
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#374151] dark:text-[#94A3B8]">
                Upload and share learning materials.
              </p>
              <Button className="mt-4 w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white">
                Upload Resources
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] backdrop-blur-xl rounded-2xl shadow-lg hover:scale-[1.02] transition-all">
            <CardHeader>
              <CardTitle className="text-[#1E1E7E] dark:text-[#F8FAFC]">
                Profile ⚙️
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#374151] dark:text-[#94A3B8]">
                Update your profile and settings.
              </p>
              <Button className="mt-4 w-full bg-[#F59E0B] hover:bg-[#D97706] text-white">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default FacultyDashboardPage
