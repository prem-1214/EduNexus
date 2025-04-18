import React, { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom" // Added Navigate
import { ThemeProvider } from "./Context/ThemeContext.jsx"
import ErrorBoundary from "./utils/ErrorBoundary.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"

// Faculty imports
import FacultyDashboardPage from "./pages/Faculty/FacultyDashboardPage.jsx"
import TotalStudents from "./pages/Faculty/TotalStudents.jsx"
import Schedule from "./components/Student/Schedule/Schedule.jsx"
import ExploreVideosPage from "./pages/ExploreVideosPage.jsx"
import UploadVideoPage from "./pages/Faculty/UploadVideoPage.jsx"
import { useUser } from "./context/UserContext.jsx"
import FacultySidebar from "./pages/Faculty/FacultySidebar.jsx"
import VideosPage from "./pages/Faculty/VideosPage.jsx"
import FilesPage from "./pages/Faculty/FilesPage.jsx"
import CalendarPage from "./pages/Faculty/CalanderPage.jsx"

// Student imports
import StudentSidebar from "./components/Student/StudentSidebar.jsx"
import StudentDashboardPage from "./pages/Student/StudentDashboardPage.jsx"
// import Dashboard from "./components/Student/Dashboard/Dashboard.jsx";
import UploadFilePage from "./pages/Faculty/UploadFilePage.jsx"
import Assignments from "./components/Student/Assignment/Assignment.jsx"
import Classes from "./components/Student/Classes/Classes.jsx"
import Discussions from "./components/Student/Discussion/Discussion.jsx"
import Resources from "./components/Student/Resources/Resources.jsx"
import Notes from "./components/Student/Notes/Notes.jsx"
import Downloads from "./components/Student/Download/Download.jsx"
import Recording from "./pages/Student/Recording.jsx"
import Courses from "./components/Student/Courses/Courses.jsx"
import Settings from "./components/Student/Setting/Setting.jsx"

const FacultyLayout = ({ children }) => {
  const { user } = useUser()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  if (!user) return <Navigate to="/login" />
  if (user.role !== "educator") return <Navigate to="/login" />
  if (user.isActive === false) return <Navigate to="/login" />

  return (
    <div className="flex z-50 h-screen transition-all duration-300 bg-[#F9FAFB] dark:bg-[#111827]/60 text-[#1F2937] dark:text-[#F8FAFC]">
      <FacultySidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${ 
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

const StudentLayout = ({ children }) => {
  const { user } = useUser();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "student") return <Navigate to="/login" />;
  if (user.isActive === false) return <Navigate to="/login" />;

  return (
    <div className="flex">
      <StudentSidebar onToggle={setIsSidebarCollapsed} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        } p-4`}
      >
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Educator Routes */}
        <Route
          path="/educatorDashboard"
          element={
            <FacultyLayout>
              <FacultyDashboardPage />
            </FacultyLayout>
          }
        />
        <Route
          path="/total-students"
          element={
            <FacultyLayout>
              <TotalStudents />
            </FacultyLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <FacultyLayout>
              <UploadVideoPage />
            </FacultyLayout>
          }
        />
        <Route
          path="/uploadFiles"
          element={
            <FacultyLayout>
              <UploadFilePage />
            </FacultyLayout>
          }
        />
        <Route
          path="/my-files"
          element={
            <FacultyLayout>
              {" "}
              <FilesPage />{" "}
            </FacultyLayout>
          }
        />
        <Route
          path="/uploadedVideos"
          element={
            <FacultyLayout>
              <VideosPage />
            </FacultyLayout>
          }
        />
        <Route
          path="/exploreVideos"
          element={
            <FacultyLayout>
              <ExploreVideosPage />
            </FacultyLayout>
          }
        />
        <Route
          path="/calender"
          element={
            <FacultyLayout>
              <CalendarPage />
            </FacultyLayout>
          }
        />
        <Route
          path="/editVideo/:videoId"
          element={
            <FacultyLayout>
              {" "}
              <UploadVideoPage />{" "}
            </FacultyLayout>
          }
        />

        {/* Student Routes */}
        <Route
          path="/studentDashboard"
          element={
            <StudentLayout>
              {" "}
              <StudentDashboardPage />{" "}
            </StudentLayout>
          }
        />
        {/* <Route path="/dashboard" element={<StudentLayout> <Dashboard /> </StudentLayout>} /> */}
        <Route
          path="/exploreVideos"
          element={
            <StudentLayout>
              <ExploreVideosPage />
            </StudentLayout>
          }
        />
        <Route
          path="/assignment"
          element={
            <StudentLayout>
              {" "}
              <Assignments />{" "}
            </StudentLayout>
          }
        />
        <Route
          path="/schedule"
          element={
            <StudentLayout>
              {" "}
              <Schedule />{" "}
            </StudentLayout>
          }
        />
        <Route
          path="/classes"
          element={
            <StudentLayout>
              {" "}
              <Classes />{" "}
            </StudentLayout>
          }
        />
        <Route
          path="/recordings"
          element={
            <StudentLayout>
              {" "}
              <ExploreVideosPage />{" "}
            </StudentLayout>
          }
        />
        <Route
          path="/discussions"
          element={
            <StudentLayout>
              {" "}
              <Discussions />{" "}
            </StudentLayout>
          }
        />
        <Route
          path="/resources"
          element={
            <StudentLayout>
              {" "}
              <Resources />{" "}
            </StudentLayout>
          }
        />
        <Route
          path="/notes"
          element={
            <StudentLayout>
              {" "}
              <Notes />{" "}
            </StudentLayout>
          }
        />
        <Route
          path="/downloads"
          element={
            <StudentLayout>
              {" "}
              <Downloads />{" "}
            </StudentLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <StudentLayout>
              {" "}
              <Courses />{" "}
            </StudentLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <StudentLayout>
              {" "}
              <Settings />{" "}
            </StudentLayout>
          }
        />
        {/* 404 Page */}
      </Routes>
    </ThemeProvider>
  )
}
export default App
