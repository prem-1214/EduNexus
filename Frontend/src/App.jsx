import { Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import ErrorBoundary from './utils/ErrorBoundary.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
// import FacultySidebar from './hooks/Faculty/FacultySidebar.jsx'
import FacultyDashboardPage from "./pages/Faculty/FacultyDashboardPage.jsx";
import TotalStudents from './hooks/Faculty/TotalStudents.jsx'
import VideosPage from './pages/Faculty/VideosPage.jsx'; // Fixed casing
import UploadVideoPage from './pages/Faculty/UploadVideoPage.jsx';
import { useUser } from './context/UserContext.jsx';
import FacultySidebar from "./hooks/Faculty/FacultySidebar.jsx";

const FacultyLayout = ({ children }) => (
  <div className="flex">
    <FacultySidebar />
    <div className="flex-1">{children}</div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/facultyDashboard"
        element={
          <ProtectedRoute>
            <FacultyLayout>
              <FacultyDashboardPage />
            </FacultyLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/total-students"
        element={
          <ProtectedRoute>
            <FacultyLayout>
              <TotalStudents />
            </FacultyLayout>
          </ProtectedRoute>
          }
        
      />
      <Route
        path="/videos"
        element={
          <ProtectedRoute>
            <FacultyLayout>
              <VideosPage />
            </FacultyLayout>
          </ProtectedRoute>
          }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <FacultyLayout>
              <UploadVideoPage />
            </FacultyLayout>
          </ProtectedRoute>
          }
      />
    </Routes>
  );
}

export default App;
