import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../Context/ThemeContext.jsx";

const UploadedVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme(); // Access dark mode state

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/video/uploadedVideos");
        if (!Array.isArray(response.data)) {
          console.error("Unexpected response format:", response.data);
          return;
        }
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/video/deleteVideo/${videoId}`);
      setVideos((prev) => prev.filter((video) => video._id !== videoId));
      alert("Video deleted successfully!");
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video.");
    }
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
            : "bg-gradient-to-br from-purple-200 to-blue-200 text-gray-900"
        }`}
      >
        <p className="text-lg font-semibold animate-pulse">
          Loading your videos...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-8 min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold drop-shadow-sm">
          Your Uploaded Videos
        </h1>
        <p className="mt-2 text-lg">
          Manage and preview your uploaded content below
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {videos.map((video) => (
          <div
            key={video._id}
            className={`overflow-hidden ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            {/* Thumbnail */}
            <div
              onClick={() => window.open(video.videoUrl, "_blank")}
              className="cursor-pointer relative rounded-lg overflow-hidden"
            >
              <img
                src={
                  video.thumbnailUrl || "https://via.placeholder.com/300x200"
                }
                alt="thumbnail"
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration || "N/A"}
              </div>
            </div>

            {/* Video Details */}
            <div className="p-3 flex justify-between items-start">
              <div>
                <h3
                  className={`text-sm font-bold truncate ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {video.title}
                </h3>
                <p
                  className={`text-xs mt-1 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {video.uploader?.userName || "Unknown Uploader"}
                </p>
                <div
                  className={`text-xs mt-2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span>{video.views || 0} views</span> ·{" "}
                  <span>{video.uploadedAtFormatted || "Unknown Date"}</span>
                </div>
              </div>
              <div className="py-4 ">
                <button
                  onClick={() => handleDelete(video._id)}
                  className={`ml-4 h-fit px-3 py-1 text-sm font-semibold rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center mt-20 text-lg">
          You haven't uploaded any videos yet.
        </div>
      )}
    </div>
  );
};

export default UploadedVideosPage;
