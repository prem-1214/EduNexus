import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FacultySidebar from "../../hooks/Faculty/FacultySidebar.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../../../srcStyle/components/ui/card.jsx";
import { Button } from "../../../srcStyle/components/ui/button.jsx";
import { Skeleton } from "../../../srcStyle/components/ui/skeleton.jsx";

function FacultyDashboardPage() {
  const { user } = useUser();
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchTotalStudents = async () => {
      try {
        const response = await axios.get("/video/total-students", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setTotalStudents(response.data.totalStudents);
      } catch (error) {
        console.error("Error fetching total students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTotalStudents();
  }, [user, navigate]);

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-200 to-purple-400 text-gray-900">
  <FacultySidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

  <main className="flex-1 p-8 transition-all duration-300">

        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome, {user?.userName?.split(".")[0].toUpperCase() || "Faculty"}!
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Manage your courses, assignments, and students.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/total-students">
            <Card className="bg-white shadow-lg transition transform hover:scale-105 border border-gray-300">
              <CardHeader>
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <p className="text-5xl font-bold text-blue-600">{totalStudents}</p>
                )}
              </CardContent>
            </Card>
          </Link>
          
          <Card className="bg-white shadow-lg border border-gray-300 transition transform hover:scale-105">
            <CardHeader>
              <CardTitle>Manage Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Edit and update your course materials.</p>
              <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white">
                View Courses
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg border border-gray-300 transition transform hover:scale-105">
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Create and manage assignments.</p>
              <Button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white">
                Create Assignment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white shadow-lg border border-gray-300 transition transform hover:scale-105">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Upload and share learning materials.</p>
              <Button className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white">
                Upload Resources
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg border border-gray-300 transition transform hover:scale-105">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Update your profile and settings.</p>
              <Button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default FacultyDashboardPage;
