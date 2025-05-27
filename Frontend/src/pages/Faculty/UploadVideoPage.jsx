import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "../../Context/ThemeContext";
import api from "../../utils/axiosInstance";

const UploadVideoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();

  // Check if editing an existing video
  const editingVideo = location.state?.video || null;

  const [title, setTitle] = useState(editingVideo?.title || "");
  const [description, setDescription] = useState(
    editingVideo?.description || ""
  );
  const [thumbnail, setThumbnail] = useState(null);
  const [program, setProgram] = useState(editingVideo?.program || "");
  const [branch, setBranch] = useState(editingVideo?.branch || "");
  const [semester, setSemester] = useState(editingVideo?.semester || "");
  const [subject, setSubject] = useState(editingVideo?.subject || "");
  const [videoFile, setVideoFile] = useState(null); // For uploading new videos
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const branchOptions = {
    "B.Tech": ["CSE", "ECE", "ME", "CE"],
    "B.Sc": ["Maths", "Physics", "Chemistry"],
    BBA: ["General", "Finance", "Marketing"],
  };

  const semesterOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

  // Handle form submission for editing or uploading
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (program) formData.append("program", program);
      if (branch) formData.append("branch", branch);
      if (semester) formData.append("semester", semester);
      if (subject) formData.append("subject", subject);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      if (editingVideo) {
        // Editing an existing video
        const response = await api.patch(
          `/video/editVideo/${editingVideo._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setMessage(response.data.message);
        console.log("Video details updated successfully!");
      } else {
        // Uploading a new video
        if (videoFile) formData.append("video", videoFile);
        const response = await api.post("/video/uploadVideo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setMessage(response.data.message);
        console.log("Video uploaded successfully!");
      }

      navigate("/uploadedVideos");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-all duration-300 backdrop-blur-md p-6 ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#FAFAFA] text-[#1F2937]"
      }`}
    >
      <Card className="w-full max-w-4xl bg-white dark:bg-[#1E293B] shadow-xl rounded-2xl border border-[#E5E7EB] dark:border-[#334155]">
        <CardHeader className="p-6 border-b border-[#E5E7EB] dark:border-[#334155]">
          <CardTitle className="text-3xl font-semibold text-[#1E1E7E] dark:text-[#F8FAFC]">
            {editingVideo ? "✏️ Edit Video Details" : "📤 Upload New Video"}
          </CardTitle>
          <p className="text-[#374151] dark:text-[#94A3B8] text-sm mt-1">
            {editingVideo
              ? "Update your video details and thumbnail below!"
              : "Fill in the details to upload a new video!"}
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block mb-1 font-medium">📌 Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
                placeholder="Enter video title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium">📝 Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
                placeholder="Enter video description (optional)"
              />
            </div>

            {/* Program */}
            <div>
              <label className="block mb-1 font-medium">🏫 Program</label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
              >
                <option value="">Select Program</option>
                {Object.keys(branchOptions).map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="block mb-1 font-medium">🏢 Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
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

            {/* Semester */}
            <div>
              <label className="block mb-1 font-medium">📚 Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
              >
                <option value="">Select Semester</option>
                {semesterOptions.map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 font-medium">📖 Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
                placeholder="Enter subject (optional)"
              />
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block mb-1 font-medium">🖼️ Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
              />
            </div>

            {/* Video Upload (only for new videos) */}
            {!editingVideo && (
              <div>
                <label className="block mb-1 font-medium">🎥 Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                className="w-full p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading
                  ? editingVideo
                    ? "Updating..."
                    : "Uploading..."
                  : editingVideo
                  ? "Update Video"
                  : "Upload Video"}
              </Button>
            </div>

            {/* Message */}
            {message && (
              <p
                className={`text-center mt-4 ${
                  message.includes("Error") ? "text-red-500" : "text-green-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadVideoPage;
