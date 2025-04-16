import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../Context/ThemeContext.jsx";

const UploadedVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isDarkMode } = useTheme();
  const videosPerPage = 9

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/video/uploadedVideos?page=${currentPage}&limit=${videosPerPage}`);
        const { videos, totalPages } = response.data;
        setVideos(videos);
        console.log("Fetched Videos:", videos);
        setTotalPages(totalPages);

      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
        <p className="text-lg font-semibold animate-pulse">Loading your videos...</p>
      </div>
    );
  }

  return (
    <div
      className={`p-8 min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold drop-shadow-sm">Your Uploaded Videos</h1>
        <p className="mt-2 text-lg">Manage and preview your uploaded content below</p>
      </header>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {videos.map((video) => (
          <div
            key={video._id}
            className={`overflow-hidden ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } border rounded-lg shadow-md`}
          >
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

            <div className="p-3 flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold truncate">{video.title}</h3>
                <p className="text-xs mt-1">{video.uploader?.userName || "Unknown Uploader"}</p>
                <div className="text-xs mt-2 text-gray-500">
                  <span>{video.views || 0} views</span> ·{" "}
                  <span>{new Date(video.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2 flex-wrap">
          {/* Prev Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border text-white ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Prev
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                currentPage === i + 1
                  ? isDarkMode
                    ? "bg-blue-500 text-white"
                    : "bg-blue-600 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border text-white ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadedVideosPage;