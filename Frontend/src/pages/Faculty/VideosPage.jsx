import React, { useEffect, useState } from "react";
import axios from "axios";

const VideosPage = () => {
  const [videos, setVideos] = useState([]); // State to store the list of videos
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => { 
    const fetchVideos = async () => {  
      try {
        const response = await axios.get("/video/videos"); // Backend route
        if (!Array.isArray(response.data)) {
          console.error("Unexpected response format:", response.data);
          setLoading(false);
          return;
        }
        console.log("Fetched videos::::", response.data); // Log the fetched videos
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };
  
    fetchVideos();
  }, []);

  useEffect(() => {
    console.log("Videos state updated:", videos); // Log the videos state
  }, [videos]);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Uploaded videos</h1>
        <p className="text-gray-600 mt-2">
          List of all uploaded videos with their details.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => {
          console.log("Rendering video:", video); // Log each video being rendered
          return (
            <div
  key={video._id}
  className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
  onClick={() => window.open(video.videoUrl, "_blank")}
>
  <div className="h-40 bg-gray-200 flex items-center justify-center">
    <img
      src={video.thumbnailUrl || "https://via.placeholder.com/150"}
      alt="thumbnail"
    />
  </div>
  <div className="p-4">
    <h3 className="font-semibold text-lg text-gray-800">{video.title}</h3>
    <p className="text-gray-600 mt-2 text-sm">{video.description}</p>
    <p className="text-gray-500 mt-2 text-sm">
      Uploaded by: {video.uploader?.userName || "Unknown"}
    </p>
  </div>
</div>
          );
        })}
      </div>
    </div>
  );
};

export default VideosPage;