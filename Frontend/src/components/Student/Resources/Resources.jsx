import { useState } from "react"
import { FaSearch, FaDownload, FaFilePdf, FaLink } from "react-icons/fa"
import { useTheme } from "../../../Context/ThemeContext"

const resourceData = [
  {
    id: 1,
    title: "React Introduction PDF",
    type: "pdf",
    url: "/files/react-intro.pdf",
  },
  {
    id: 2,
    title: "MongoDB Notes",
    type: "pdf",
    url: "/files/mongodb-notes.pdf",
  },
  {
    id: 3,
    title: "Tailwind Docs",
    type: "link",
    url: "https://tailwindcss.com/docs",
  },
  {
    id: 4,
    title: "GitHub Guide",
    type: "link",
    url: "https://docs.github.com/en/get-started",
  },
]

const Resources = () => {
  const [search, setSearch] = useState("")
  const { isDarkMode } = useTheme()

  const filteredResources = resourceData.filter((res) =>
    res.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className={`p-6 pt-20 transition-all duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">📚 Resources</h1>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <FaSearch
          className={`absolute top-3 left-3 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring ${
            isDarkMode
              ? "bg-[#1E293B] text-[#F8FAFC] border-gray-600 focus:border-blue-500"
              : "bg-white text-gray-800 border-gray-300 focus:border-blue-400"
          }`}
        />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => <ResourceCard key={res.id} {...res} />)
        ) : (
          <p
            className={`col-span-full ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No matching resources.
          </p>
        )}
      </div>
    </div>
  )
}

const ResourceCard = ({ title, type, url }) => {
  const { isDarkMode } = useTheme()
  const isPDF = type === "pdf"
  const isLink = type === "link"

  return (
    <div
      className={`rounded-xl shadow-md p-4 border-l-4 hover:shadow-lg transition-all ${
        isDarkMode
          ? "bg-[#1E293B] text-[#F8FAFC] border-indigo-500"
          : "bg-white text-gray-800 border-indigo-600"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        {isPDF && (
          <FaFilePdf
            className={`text-xl ${
              isDarkMode ? "text-red-400" : "text-red-600"
            }`}
          />
        )}
        {isLink && (
          <FaLink
            className={`text-xl ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
        )}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="flex justify-end">
        {isPDF ? (
          <a
            href={url}
            download
            className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded transition ${
              isDarkMode
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <FaDownload /> Download
          </a>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded transition ${
              isDarkMode
                ? "bg-green-600 text-white hover:bg-green-500"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            <FaLink /> Visit
          </a>
        )}
      </div>
    </div>
  )
}

export default Resources
