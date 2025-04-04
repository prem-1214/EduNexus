import React, { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../../../srcStyle/components/ui/card.jsx";
import { Button } from "../../../srcStyle/components/ui/button.jsx";
import { Skeleton } from "../../../srcStyle/components/ui/skeleton.jsx";
import { UploadCloud, Video, Image } from "lucide-react";

const UploadVideoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) {
      setMessage("Please select a video file to upload.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);

    try {
      const response = await axios.post("/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("Error uploading video.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0];
    if (type === "video") setVideo(file);
    else if (type === "thumbnail") setThumbnail(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-400">
      <Card className="w-full max-w-3xl bg-white shadow-2xl border border-gray-300 rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">Upload Video</CardTitle>
          <p className="text-gray-600">Upload a new video along with a thumbnail.</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpload} className="space-y-6">
            {/* Title & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 shadow-sm"
                  placeholder="Enter video title"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 shadow-sm"
                  placeholder="Enter video description"
                  required
                />
              </div>
            </div>

            {/* Video Upload Section */}
            <div className="relative border border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 cursor-pointer transition-shadow duration-300 shadow-md hover:shadow-lg">
              <input type="file" accept="video/*" onChange={(e) => handleFileSelect(e, "video")} className="hidden" id="videoUpload" />
              <label htmlFor="videoUpload" className="flex flex-col items-center cursor-pointer">
                <Video className="w-14 h-14 text-gray-600 transition-transform duration-200 hover:scale-110" />
                <p className="mt-2 text-gray-700 font-medium">{video ? video.name : "Click to select a video file"}</p>
              </label>
            </div>

            {/* Thumbnail Upload Section */}
            <div className="relative border border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 cursor-pointer transition-shadow duration-300 shadow-md hover:shadow-lg">
              <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, "thumbnail")} className="hidden" id="thumbnailUpload" />
              <label htmlFor="thumbnailUpload" className="flex flex-col items-center cursor-pointer">
                <Image className="w-14 h-14 text-gray-600 transition-transform duration-200 hover:scale-110" />
                <p className="mt-2 text-gray-700 font-medium">{thumbnail ? thumbnail.name : "Click to select a thumbnail image"}</p>
              </label>
            </div>

            {/* Upload Button */}
            <Button type="submit" className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-purple-600 hover:to-violet-500 text-white text-lg py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300" disabled={loading}>
              {loading ? <Skeleton className="h-6 w-24" /> : <UploadCloud className="inline-block w-5 h-5 mr-2" />} Upload Video
            </Button>
          </form>

          {message && <p className="mt-4 text-gray-700 text-center font-medium">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadVideoPage;
