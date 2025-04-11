import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../Context/ThemeContext.jsx"; // Import ThemeContext for dark mode

const ExploreVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme(); // Access dark mode state

  // Filter state
  const [program, setProgram] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/video/exploreVideos");
        if (!Array.isArray(response.data)) {
          console.error("Unexpected response format:", response.data);
          setLoading(false);
          return;
        }
        setVideos(response.data);
        setFilteredVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Apply filters whenever dropdowns change
  useEffect(() => {
    const filtered = videos.filter((video) => {
      return (
        (program === "" || video.program === program) &&
        (branch === "" || video.branch === branch) &&
        (semester === "" || video.semester === semester) &&
        (subject === "" || video.subject === subject)
      );
    });

    setFilteredVideos(filtered);
  }, [program, branch, semester, subject, videos]);

  const uniqueOptions = (key) => [
    ...new Set(videos.map((v) => v[key]).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
            : "bg-gradient-to-br from-purple-200 to-blue-200 text-gray-900"
        }`}
      >
        <p className="text-lg font-semibold animate-pulse">Loading videos...</p>
      </div>
    );
  }

  return (
    <div
      className={`p-8 min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          // 
          :"bg-white"
      }`}
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold drop-shadow-sm">
          Explore Videos
        </h1>
        <p className="mt-2 text-lg">Filter and discover content</p>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className={`px-3 py-2 rounded-lg border shadow-sm ${
            isDarkMode
              ? "bg-gray-800 text-gray-100 border-gray-700"
              : "bg-white text-gray-900"
          }`}
        >
          <option value="">All Programs</option>
          {uniqueOptions("program").map((prog, idx) => (
            <option key={idx} value={prog}>
              {prog}
            </option>
          ))}
        </select>

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className={`px-3 py-2 rounded-lg border shadow-sm ${
            isDarkMode
              ? "bg-gray-800 text-gray-100 border-gray-700"
              : "bg-white text-gray-900"
          }`}
        >
          <option value="">All Branches</option>
          {uniqueOptions("branch").map((br, idx) => (
            <option key={idx} value={br}>
              {br}
            </option>
          ))}
        </select>

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className={`px-3 py-2 rounded-lg border shadow-sm ${
            isDarkMode
              ? "bg-gray-800 text-gray-100 border-gray-700"
              : "bg-white text-gray-900"
          }`}
        >
          <option value="">All Semesters</option>
          {uniqueOptions("semester").map((sem, idx) => (
            <option key={idx} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={`px-3 py-2 rounded-lg border shadow-sm ${
            isDarkMode
              ? "bg-gray-800 text-gray-100 border-gray-700"
              : "bg-white text-gray-900"
          }`}
        >
          <option value="">All Subjects</option>
          {uniqueOptions("subject").map((sub, idx) => (
            <option key={idx} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      {/* Video Cards */}
{/* Video Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-8">
  {filteredVideos.map((video) => (
    <div
      key={video._id}
      className={`overflow-hidden transition-transform ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-white "
      }`}
    >
      {/* Thumbnail */}
      <div
        onClick={() => window.open(video.videoUrl, "_blank")}
        className="cursor-pointer relative rounded-lg overflow-hidden"
      >
        <img
          src={video.thumbnailUrl || "https://via.placeholder.com/300x200"}
          alt="thumbnail"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration || "N/A"}
        </div>
      </div>

      {/* Video Details */}
      <div className="px-6 py-1">
        <h3
          className={`text-lg font-bold truncate ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {video.title}
        </h3>
        <p
          className={`text-sm mt-2 line-clamp-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {video.description || "No description available"}
        </p>
        <div className="grid gap-y-0 text-sm mt-2" 
          style={{ gridTemplateColumns: "42% 42%", columnGap: "2%" }}
        >
          <p>
            <strong>Program:</strong> {video.program || "N/A"}
          </p>
          <p>
            <strong>Branch:</strong> {video.branch || "N/A"}
          </p>
          <p>
            <strong>Semester:</strong> {video.semester || "N/A"}
          </p>
          <p>
            <strong>Subject:</strong> {video.subject || "N/A"}
          </p>
        </div>
        <div
          className={`text-xs mt-2 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span>{video.views || 0} views</span> ·{" "}
          <span>{video.uploadedAtFormatted || "Unknown Date"}</span>
        </div>
      </div>
    </div>
  ))}
</div>

      {filteredVideos.length === 0 && (
        <div className="text-center mt-20 text-lg">
          No videos found with selected filters.
        </div>
      )}
    </div>
  );
};

export default ExploreVideosPage;
