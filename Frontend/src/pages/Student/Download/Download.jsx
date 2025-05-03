import { useState } from "react"
import { FaSearch, FaDownload, FaFileAlt } from "react-icons/fa"
import { useTheme } from "../../../context/ThemeContext"

const initialDownloads = [
  {
    id: 1,
    title: "C++ Complete Guide",
    url: "/downloads/cpp-guide.pdf",
    size: "2.4MB",
  },
  {
    id: 2,
    title: "Operating System Notes",
    url: "/downloads/os-notes.pdf",
    size: "1.1MB",
  },
  {
    id: 3,
    title: "DSA Cheat Sheet",
    url: "/downloads/dsa-cheatsheet.pdf",
    size: "650KB",
  },
]

const Downloads = () => {
  const [search, setSearch] = useState("")
  const { isDarkMode } = useTheme()

  const filteredDownloads = initialDownloads.filter((file) =>
    file.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className={`p-6 pt-20 transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">📁 Downloads</h1>

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <FaSearch
          className={`absolute top-3 left-3 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
        <input
          type="text"
          placeholder="Search downloads..."
          className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring ${
            isDarkMode
              ? "bg-[#1E293B] text-[#F8FAFC] border-gray-600 focus:border-blue-500"
              : "bg-white text-gray-800 border-gray-300 focus:border-blue-400"
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDownloads.length > 0 ? (
          filteredDownloads.map((file) => (
            <DownloadCard key={file.id} {...file} />
          ))
        ) : (
          <p
            className={`col-span-full ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No files found.
          </p>
        )}
      </div>
    </div>
  )
}

const DownloadCard = ({ title, url, size }) => {
  const { isDarkMode } = useTheme()

  return (
    <div
      className={`p-5 rounded-xl shadow-lg hover:shadow-xl transition ${
        isDarkMode
          ? "bg-gradient-to-r from-blue-900 to-indigo-800 text-[#F8FAFC]"
          : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <FaFileAlt className="text-xl" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span>{size}</span>
        <a
          href={url}
          download
          className={`flex items-center gap-2 px-3 py-1 rounded transition ${
            isDarkMode
              ? "bg-[#F8FAFC] text-blue-900 hover:bg-gray-200"
              : "bg-white text-blue-600 hover:bg-blue-100"
          }`}
        >
          <FaDownload /> Download
        </a>
      </div>
    </div>
  )
}

export default Downloads
