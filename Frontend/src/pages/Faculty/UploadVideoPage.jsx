import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../../../srcStyle/components/ui/card.jsx";
import { Button } from "../../../srcStyle/components/ui/button.jsx";
import { Skeleton } from "../../../srcStyle/components/ui/skeleton.jsx";
import { UploadCloud, Video, Image } from "lucide-react";

const UploadVideoPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [program, setProgram] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const branchOptions = {
    "B.Tech": ["CSE", "ECE", "ME", "CE"],
    "B.Sc": ["Maths", "Physics", "Chemistry"],
    "BBA": ["General", "Finance", "Marketing"],
  };

  const semesterOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("program", program);
      formData.append("branch", branch);
      formData.append("semester", semester);
      formData.append("subject", subject);
      if (video) formData.append("video", video);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const response = await axios.post("/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setMessage(response.data.message);
      navigate("/uploadedVideos");
    } catch (error) {
      console.error("Error submitting video:", error);
      setMessage("Error submitting video.");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-blue-200">
      <Card className="w-full max-w-3xl bg-white shadow-2xl border border-gray-300 rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">Upload Video</CardTitle>
          <p className="text-gray-600">Upload a new video along with a thumbnail and details.</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter video title"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter video description"
                  required
                />
              </div>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium">Program</label>
                <select
                  value={program}
                  onChange={(e) => {
                    setProgram(e.target.value);
                    setBranch(""); // reset branch when program changes
                  }}
                  className="block w-full border border-gray-300 rounded-lg p-2"
                  required
                >
                  <option value="">Select Program</option>
                  {Object.keys(branchOptions).map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2"
                  required
                  disabled={!program}
                >
                  <option value="">Select Branch</option>
                  {program &&
                    branchOptions[program].map((br) => (
                      <option key={br} value={br}>
                        {br}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2"
                  required
                >
                  <option value="">Select Semester</option>
                  {semesterOptions.map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter subject name"
                  required
                />
              </div>
            </div>

            {/* Video Upload */}
            <div className="relative border border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 cursor-pointer shadow-md hover:shadow-lg">
              <input type="file" accept="video/*" onChange={(e) => handleFileSelect(e, "video")} className="hidden" id="videoUpload" />
              <label htmlFor="videoUpload" className="flex flex-col items-center cursor-pointer">
                <Video className="w-14 h-14 text-gray-600" />
                <p className="mt-2 text-gray-700 font-medium">{video ? video.name : "Click to select a video file"}</p>
              </label>
            </div>

            {/* Thumbnail Upload */}
            <div className="relative border border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100 cursor-pointer shadow-md hover:shadow-lg">
              <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, "thumbnail")} className="hidden" id="thumbnailUpload" />
              <label htmlFor="thumbnailUpload" className="flex flex-col items-center cursor-pointer">
                <Image className="w-14 h-14 text-gray-600" />
                <p className="mt-2 text-gray-700 font-medium">{thumbnail ? thumbnail.name : "Click to select a thumbnail image"}</p>
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 rounded-lg shadow-md hover:shadow-xl transition-all"
              disabled={loading}
            >
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
