import React, { useEffect, useState } from "react"
import axios from "axios"
import { useTheme } from "../../../Context/ThemeContext.jsx"
import Pagination from "../../../components/Pagination/Pagination.jsx"

const ExploreVideosPage = () => {
  const { isDarkMode } = useTheme()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const limit = 9

  // Filters
  const [program, setProgram] = useState("")
  const [branch, setBranch] = useState("")
  const [semester, setSemester] = useState("")
  const [subject, setSubject] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const fetchVideos = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get("/video/exploreVideos", {
        params: {
          page,
          limit,
          program,
          branch,
          semester,
          subject,
          searchTerm,
        },
      })
      setVideos(data.videos)
      setTotal(data.total)
    } catch (err) {
      console.error("Error fetching videos", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [page, program, branch, semester, subject, searchTerm])

  const uniqueOptions = (key) => [
    ...new Set(videos.map((v) => v[key]).filter(Boolean)),
  ]

  const totalPages = Math.ceil(total / limit)

  return (
    <div
      className={`p-8 min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold drop-shadow-sm">
          Explore Videos
        </h1>
        <p className="mt-2 text-lg">Filter and discover content</p>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className={selectClass(isDarkMode)}
        >
          <option value="">All Programs</option>
          {uniqueOptions("program").map((prog, idx) => (
            <option key={idx}>{prog}</option>
          ))}
        </select>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className={selectClass(isDarkMode)}
        >
          <option value="">All Branches</option>
          {uniqueOptions("branch").map((br, idx) => (
            <option key={idx}>{br}</option>
          ))}
        </select>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className={selectClass(isDarkMode)}
        >
          <option value="">All Semesters</option>
          {uniqueOptions("semester").map((sem, idx) => (
            <option key={idx}>{sem}</option>
          ))}
        </select>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={selectClass(isDarkMode)}
        >
          <option value="">All Subjects</option>
          {uniqueOptions("subject").map((sub, idx) => (
            <option key={idx}>{sub}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={selectClass(isDarkMode)}
        />
      </div>

      {/* Video Grid */}
      {loading ? (
        <p className="text-center animate-pulse text-lg">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-8">
          {videos.map((video) => (
            <div
              key={video._id}
              className={`${isDarkMode ? "bg-gray-900" : "bg-white"}`}
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
              <div className="px-6 py-1">
                <h3
                  className={`text-lg font-bold truncate ${
                    isDarkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {video.title}
                </h3>
                <p
                  className={`text-sm mt-2 line-clamp-2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {video.description || "No description available"}
                </p>
                <div
                  className="grid gap-y-0 text-sm mt-2"
                  style={{ gridTemplateColumns: "42% 42%", columnGap: "2%" }}
                >
                  <p>
                    <strong>Program:</strong> {video.program || "N/A"}
                  </p>
                  <p>
                    <strong>Branch:</strong> {video.branch || "N/A"}
                  </p>
                  <p>
                    <strong>Semester:</strong> {video.semester || "N/A"}
                  </p>
                  <p>
                    <strong>Subject:</strong> {video.subject || "N/A"}
                  </p>
                </div>
                <div
                  className={`text-xs mt-2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span>{video.views || 0} views</span> ·{" "}
                  <span>{video.uploadedAtFormatted || "Unknown Date"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isDarkMode={isDarkMode}
      />
    </div>
  )
}

const selectClass = (isDarkMode) =>
  `px-3 py-2 rounded-lg border shadow-sm ${
    isDarkMode
      ? "bg-gray-800 text-gray-100 border-gray-700"
      : "bg-white text-gray-900"
  }`

export default ExploreVideosPage
