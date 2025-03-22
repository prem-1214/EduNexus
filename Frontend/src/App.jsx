import './App.css'
import { Auth0Provider } from '@auth0/auth0-react';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';
import LogOutButton from './components/LogOut/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import Assignment from './components/Assignment/Assignment';
import Schedule from "./components/Schedule/Schedule";
import Recordings from "./components/Recording/Recording";
import Discussions from "./components/Discussion/Discussion";
import Resources from "./components/Resources/Resources";
import Notes from "./components/Notes/Notes";
import Downloads from "./components/Download/Download";
import Classes from "./components/Classes/Classes";
import Courses from "./components/Courses/Courses";
import Settings from "./components/Setting/Setting";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<LogOutButton />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
