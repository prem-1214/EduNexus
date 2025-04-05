import React, { useEffect, useState } from "react"
import axios from "axios"
import { useUser } from "../../context/UserContext.jsx"

const VideosPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true) 
  const {user} = useUser()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("user in fetch : ", user)
        const response = await axios.get("/video/exploreVideos")
        if (!Array.isArray(response.data)) {
          console.error("Unexpected response format:", response.data)
          setLoading(false)
          return
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
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-lg">Uploaded Videos</h1>
        <p className="text-gray-600 mt-2 text-lg">Explore all the shared video content</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
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
              <p className="text-xs text-gray-500 mt-4 italic">
                <span className="font-lg text-black font-semibold">{video.uploader?.userName?.replace('.', ' ') || "Unknown"}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage
