import React, { useEffect, useState } from "react"
import axios from "axios"
import { useTheme } from "../../Context/ThemeContext.jsx"

const UploadedVideosPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredVideos, setFilteredVideos] = useState([])
  const [filter, setFilter] = useState({
    subject: "",
    semester: "",
    program: "",
    branch: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const { isDarkMode } = useTheme()

  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 6

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/video/uploadedVideos")
        if (!Array.isArray(response.data)) {
          console.error("Unexpected response format:", response.data)
          return
        }
        setVideos(response.data)
        setFilteredVideos(response.data)
      } catch (error) {
        console.error("Error fetching videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  useEffect(() => {
    const { subject, semester, program, branch } = filter
    const filtered = videos.filter((video) => {
      return (
        (!subject ||
          video.subject?.toLowerCase().includes(subject.toLowerCase())) &&
        (!semester || video.semester === semester) &&
        (!program || video.program === program) &&
        (!branch || video.branch === branch) &&
        (!searchTerm ||
          video.title?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })
    setFilteredVideos(filtered)
  }, [filter, videos, searchTerm])

  useEffect(() => {
    setCurrentPage(1) // Reset to page 1 on filter/search change
  }, [filter, searchTerm])

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    )
    if (!confirmDelete) return
    try {
      await axios.delete(`/video/deleteVideo/${videoId}`)
      setVideos((prev) => prev.filter((video) => video._id !== videoId))
      alert("Video deleted successfully!")
    } catch (error) {
      console.error("Error deleting video:", error)
      alert("Failed to delete video.")
    }
  }

  const indexOfLastVideo = currentPage * videosPerPage
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage
  const paginatedVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  )
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)

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
    )
  }

  return (
    <div
      className={`p-8 min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
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

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Filter by Subject"
          className="border p-2 rounded"
          value={filter.subject}
          onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Search by Title"
          className="border p-2 rounded col-span-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filter.semester}
          onChange={(e) => setFilter({ ...filter, semester: e.target.value })}
        >
          <option value="">All Semesters</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={(i + 1).toString()}>
              Semester {i + 1}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={filter.program}
          onChange={(e) =>
            setFilter({ ...filter, program: e.target.value, branch: "" })
          }
        >
          <option value="">All Programs</option>
          <option value="B.Tech">B.Tech</option>
          <option value="B.Sc">B.Sc</option>
          <option value="BBA">BBA</option>
          <option value="BCA">BCA</option>
        </select>
        <select
          className="border p-2 rounded"
          value={filter.branch}
          onChange={(e) => setFilter({ ...filter, branch: e.target.value })}
          disabled={!filter.program}
        >
          <option value="">All Branches</option>
          {filter.program === "B.Tech" &&
            ["CSE", "ECE", "ME", "CE"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          {filter.program === "B.Sc" &&
            ["Maths", "Physics", "Chemistry"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          {filter.program === "BBA" &&
            ["General", "Finance", "Marketing"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
        </select>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {paginatedVideos.map((video) => (
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

            <div className="p-3 flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold truncate">{video.title}</h3>
                <p className="text-xs mt-1">
                  {video.uploader?.userName || "Unknown Uploader"}
                </p>
                <div className="text-xs mt-2 text-gray-500">
                  <span>{video.views || 0} views</span> ·{" "}
                  <span>{video.uploadedAtFormatted || "Unknown Date"}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(video._id)}
                className={`ml-4 px-3 py-1 text-sm font-semibold rounded-lg ${
                  isDarkMode
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center mt-20 text-lg">
          No videos match the selected filters.
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2 flex-wrap">
          {/* Prev Button */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
              onClick={() => setCurrentPage(i + 1)}
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
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
  )
}

export default UploadedVideosPage
