import React, { useEffect, useState } from "react";
import axios from "axios";

const VideosPage = () => {
  const [videos, setVideos] = useState([]); // State to store the list of videos
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch videos from the backend
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/video/videos"); // Backend route
        setVideos(response.data);
        console.log("Fetched videos:", response.data); // Log the fetched videos
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Uploaded Videos</h1>
        <p className="text-gray-600 mt-2">
          List of all uploaded videos with their details.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Thumbnail Placeholder</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{video.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{video.description}</p>
              <p className="text-gray-500 mt-2 text-sm">Uploaded by: {video.uploader?.name || "Unknown"}</p>
              <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                Watch Video
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;