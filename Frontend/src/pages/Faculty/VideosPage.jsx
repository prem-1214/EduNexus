import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext.jsx";

const UploadedVideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

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
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-violet-200 to-purple-300">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Loading your videos...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br bg-gradient-to-br from-purple-200 to-blue-200 min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm">Your Uploaded Videos</h1>
        <p className="text-gray-700 mt-2 text-lg">Manage and preview your uploaded content below</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden"
          >
            <div
              onClick={() => window.open(video.videoUrl, "_blank")}
              className="cursor-pointer h-48 bg-gray-100 flex items-center justify-center overflow-hidden"
            >
              <img
                src={video.thumbnailUrl || "https://via.placeholder.com/300x200"}
                alt="thumbnail"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 truncate">{video.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{video.description}</p>
              <p className="text-xs text-gray-500 mt-4 italic">
                Uploaded by:{" "}
                <span className="text-base text-black font-semibold">
                  {video.uploader?.userName?.replace(".", " ") || "Unknown"}
                </span>
              </p>
              <div className="flex justify-end mt-5">
                <button
                  onClick={() => handleDelete(video._id)}
                  className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center mt-20 text-gray-700 text-lg">
          You haven't uploaded any videos yet.
        </div>
      )}
    </div>
  );
};

export default UploadedVideosPage;
