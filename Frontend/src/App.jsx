// import './App.css';  
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/Sidebar';
import Login from './pages/Login'
import Register from './pages/Register';
import LogOutButton from './components/Logout/Logout';
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

// Layout Component (Only for Authenticated Pages)
const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1">{children}</div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Pages (No Sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Register />} />

        {/* Protected Routes (With Sidebar) */}
        {/* <Route path="/" element={<Layout><Dashboard /></Layout>} /> */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/assignment" element={<Layout><Assignment /></Layout>} />
        <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
        <Route path="/recordings" element={<Layout><Recordings /></Layout>} />
        <Route path="/discussions" element={<Layout><Discussions /></Layout>} />
        <Route path="/resources" element={<Layout><Resources /></Layout>} />
        <Route path="/notes" element={<Layout><Notes /></Layout>} />
        <Route path="/downloads" element={<Layout><Downloads /></Layout>} />
        <Route path="/classes" element={<Layout><Classes /></Layout>} />
        <Route path="/courses" element={<Layout><Courses /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/logout" element={<Layout><LogOutButton /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
