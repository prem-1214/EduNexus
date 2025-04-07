import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../srcStyle/components/ui/card.jsx";
import { Button } from "../../../srcStyle/components/ui/button.jsx";
import { Skeleton } from "../../../srcStyle/components/ui/skeleton.jsx";

function FacultyDashboardPage() {
  const { user } = useUser();
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
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
    <div className="flex h-screen bg-gradient-to-br from-purple-200 to-blue-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main
        className={`transition-all duration-300 flex-1 ${
          user?.isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <header className="p-6">
          <h1 className="text-4xl font-extrabold">
            Welcome,{" "}
            {user?.userName?.replace(".", " ").toUpperCase() || "Faculty"}!
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Manage your courses, assignments, and students.
          </p>
        </header>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/total-students">
            <Card className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg transition transform hover:scale-105">
              <CardHeader>
                <CardTitle>Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">
                    {totalStudents}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg transition transform hover:scale-105">
            <CardHeader>
              <CardTitle>Manage Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Edit and update your course materials.
              </p>
              <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                View Courses
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg transition transform hover:scale-105">
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Create and manage assignments.
              </p>
              <Button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700">
                Create Assignment
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg transition transform hover:scale-105">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Upload and share learning materials.
              </p>
              <Button className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700">
                Upload Resources
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg transition transform hover:scale-105">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Update your profile and settings.
              </p>
              <Button className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-600 dark:hover:bg-yellow-700">
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
