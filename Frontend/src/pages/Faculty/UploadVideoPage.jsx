import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UploadCloud, Video, Image } from "lucide-react"
import { useTheme } from "../../Context/ThemeContext"
import api from "../../utils/axiosInstance"

const UploadVideoPage = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [video, setVideo] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [program, setProgram] = useState("")
  const [branch, setBranch] = useState("")
  const [semester, setSemester] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const branchOptions = {
    "B.Tech": ["CSE", "ECE", "ME", "CE"],
    "B.Sc": ["Maths", "Physics", "Chemistry"],
    BBA: ["General", "Finance", "Marketing"],
  }

  const semesterOptions = ["1", "2", "3", "4", "5", "6", "7", "8"]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("program", program)
      formData.append("branch", branch)
      formData.append("semester", semester)
      formData.append("subject", subject)
      if (video) formData.append("video", video)
      if (thumbnail) formData.append("thumbnail", thumbnail)

      const response = await api.post("/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })

      setMessage(response.data.message)
      navigate("/uploadedVideos")
    } catch (error) {
      console.error("Error submitting video:", error)
      setMessage("Error submitting video.")
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e, type) => {
    const file = e.target.files[0]
    if (type === "video") setVideo(file)
    else if (type === "thumbnail") setThumbnail(file)
  }

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
            📹 Upload Video
          </CardTitle>
          <p className="text-[#374151] dark:text-[#94A3B8] text-sm mt-1">
            Share a new educational video with a fun thumbnail and details!
          </p>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">🎬 Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
                  placeholder="Enter video title"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">📝 Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
                  placeholder="Enter video description"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">🎓 Program</label>
                <select
                  value={program}
                  onChange={(e) => {
                    setProgram(e.target.value)
                    setBranch("")
                  }}
                  className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
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
                <label className="block mb-1 font-medium">🏢 Branch</label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
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
                <label className="block mb-1 font-medium">📚 Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
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
                <label className="block mb-1 font-medium">📘 Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155]"
                  placeholder="Enter subject name"
                  required
                />
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-[#1FAA59] bg-[#E0F7F1] dark:bg-[#1E293B] flex items-center justify-center p-6 text-center cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileSelect(e, "video")}
                className="hidden"
                id="videoUpload"
              />
              <label htmlFor="videoUpload" className="cursor-pointer">
                <Video className="w-10 h-10 mx-auto text-[#1FAA59]" />
                <p className="text-sm font-medium mt-2">
                  {video ? video.name : "Click to select a video file"}
                </p>
              </label>
            </div>

            <div className="rounded-2xl border border-dashed border-[#1FAA59] bg-[#E0F7F1] dark:bg-[#1E293B] flex items-center justify-center p-6 text-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, "thumbnail")}
                className="hidden"
                id="thumbnailUpload"
              />
              <label htmlFor="thumbnailUpload" className="cursor-pointer">
                <Image className="w-10 h-10 mx-auto text-[#1FAA59]" />
                <p className="text-sm font-medium mt-2">
                  {thumbnail
                    ? thumbnail.name
                    : "Click to select a thumbnail image"}
                </p>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1FAA59] hover:bg-[#16A34A] text-white font-semibold py-3 rounded-xl shadow-lg transition"
              disabled={loading}
            >
              {loading ? (
                <Skeleton className="h-6 w-24" />
              ) : (
                <span className="flex items-center justify-center">
                  <UploadCloud className="w-5 h-5 mr-2" /> Upload Video
                </span>
              )}
            </Button>

            {message && (
              <p className="mt-4 text-center text-[#DC2626] dark:text-red-400 font-semibold">
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default UploadVideoPage
