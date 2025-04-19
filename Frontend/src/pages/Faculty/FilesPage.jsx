import { useEffect, useState } from "react"
import axios from "axios"
import { useTheme } from "../../Context/ThemeContext.jsx"

const FilesPage = () => {
  const { isDarkMode } = useTheme()
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [viewMode, setViewMode] = useState("table")

  const [currentPage, setCurrentPage] = useState(1)
  const filesPerPage = 6

  const totalPages = Math.ceil(uploadedFiles.length / filesPerPage)
  const paginatedFiles = uploadedFiles.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  )

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/file/my-files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        setUploadedFiles(response.data.files)
        setError("")
      } catch (error) {
        console.error("Error fetching files:", error)
        setError("Failed to fetch files. Please try again later.")
        setSuccess("")
      }
    }

    fetchFiles()
  }, [])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#FAFAFA] text-[#1F2937]"
      } p-6 sm:p-10`}
    >
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-400">
            📁 My Files
          </h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            onClick={() =>
              setViewMode((prev) => (prev === "table" ? "card" : "table"))
            }
          >
            Switch to {viewMode === "table" ? "Card View" : "Table View"}
          </button>
        </header>

        {error && (
          <p className="text-red-500 font-medium text-center mb-4">{error}</p>
        )}
        {success && (
          <p className="text-green-500 font-medium text-center mb-4">
            {success}
          </p>
        )}

        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <th className="px-4 py-2 text-left">File Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Program</th>
                  <th className="px-4 py-2 text-left">Branch</th>
                  <th className="px-4 py-2 text-left">Semester</th>
                  <th className="px-4 py-2 text-left">Subject</th>
                  <th className="px-4 py-2 text-left">Uploaded</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedFiles.map((file) => (
                  <tr
                    key={file._id}
                    className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-2">{file.fileName}</td>
                    <td className="px-4 py-2">{file.description}</td>
                    <td className="px-4 py-2">{file.category}</td>
                    <td className="px-4 py-2">{file.program}</td>
                    <td className="px-4 py-2">{file.branch}</td>
                    <td className="px-4 py-2">{file.semester}</td>
                    <td className="px-4 py-2">{file.subject}</td>
                    <td className="px-4 py-2">
                      {file.uploadedAtFormatted || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedFiles.map((file) => (
              <div
                key={file._id}
                className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-6 transition transform hover:scale-105"
              >
                <h2 className="text-lg font-bold text-blue-900 dark:text-blue-400">
                  {file.fileName}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  {file.description || "No description"}
                </p>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-4 space-y-1">
                  <p>
                    <strong>Category:</strong> {file.category}
                  </p>
                  <p>
                    <strong>Program:</strong> {file.program}
                  </p>
                  <p>
                    <strong>Branch:</strong> {file.branch}
                  </p>
                  <p>
                    <strong>Semester:</strong> {file.semester}
                  </p>
                  <p>
                    <strong>Subject:</strong> {file.subject}
                  </p>
                  <p>
                    <strong>Uploaded:</strong>{" "}
                    {file.uploadedAtFormatted || "N/A"}
                  </p>
                </div>
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg border text-white ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
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
    </div>
  )
}

export default FilesPage
