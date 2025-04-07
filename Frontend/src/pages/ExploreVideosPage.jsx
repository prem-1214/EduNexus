import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext.jsx";

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

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

  const uniqueOptions = (key) => [...new Set(videos.map((v) => v[key]).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-blue-200">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading videos...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-200 to-purple-400 min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-lg">Explore Videos</h1>
        <p className="text-gray-600 mt-2 text-lg">Filter and discover content</p>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm"
        >
          <option value="">All Programs</option>
          {uniqueOptions("program").map((prog, idx) => (
            <option key={idx} value={prog}>{prog}</option>
          ))}
        </select>

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm"
        >
          <option value="">All Branches</option>
          {uniqueOptions("branch").map((br, idx) => (
            <option key={idx} value={br}>{br}</option>
          ))}
        </select>

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm"
        >
          <option value="">All Semesters</option>
          {uniqueOptions("semester").map((sem, idx) => (
            <option key={idx} value={sem}>{sem}</option>
          ))}
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="px-3 py-2 rounded-lg border bg-white shadow-sm"
        >
          <option value="">All Subjects</option>
          {uniqueOptions("subject").map((sub, idx) => (
            <option key={idx} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <div
            key={video._id}
            className="bg-white rounded-2xl shadow-xl transition-transform hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer border border-gray-200"
            onClick={() => window.open(video.videoUrl, "_blank")}
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={video.thumbnailUrl || "https://via.placeholder.com/300x200"}
                alt="thumbnail"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 truncate">{video.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{video.description}</p>

              <div className="text-xs text-gray-500 mt-3 space-y-1">
                <p><strong>Program:</strong> {video.program || "N/A"}</p>
                <p><strong>Branch:</strong> {video.branch || "N/A"}</p>
                <p><strong>Semester:</strong> {video.semester || "N/A"}</p>
                <p><strong>Subject:</strong> {video.subject || "N/A"}</p>
              </div>

              <p className="text-xs text-gray-500 mt-3 italic">
                <span className="text-sm text-black font-semibold">
                  {video.uploader?.userName?.replace(".", " ") || "Unknown"}
                </span>
              </p>
              <p className="text-xs text-gray-500 italic">
                {video.uploadedAtFormatted || "Unknown"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center mt-20 text-gray-700 text-lg">
          No videos found with selected filters.
        </div>
      )}
    </div>
  );
};

export default VideosPage;
