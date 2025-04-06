import { useEffect, useState } from "react"
import axios from "axios"

const FilesPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [viewMode, setViewMode] = useState("table") // 'table' or 'card'

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/file/my-files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        setUploadedFiles(response.data)
        console.log("userFiles in get my files", response.data)
        setError("")
        setSuccess("Files fetched successfully.")
      } catch (error) {
        console.error("Error fetching files:", error)
        setError("Failed to fetch files. Please try again later.")
        setSuccess("")
      }
    }

    fetchFiles()
  }, [])

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">My Files</h1>
      <div className="mb-4 flex justify-between items-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() =>
            setViewMode((prev) => (prev === "table" ? "card" : "table"))
          }
        >
          Switch to {viewMode === "table" ? "Card View" : "Table View"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {viewMode === "table" ? (
        // TABLE VIEW
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">File Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Actions</th>
              <th className="border px-4 py-2">Upload Time</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((file) => (
              <tr key={file._id}>
                <td className="border px-4 py-2">{file.fileName}</td>
                <td className="border px-4 py-2">{file.description}</td>
                <td className="border px-4 py-2">{file.category}</td>
                <td className="border px-4 py-2">
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold"
                  >
                    Download
                  </a>
                </td>
                <td className="border px-4 py-2">{file.uploadedAtFormatted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // CARD VIEW
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedFiles.map((file) => (
            <div
              key={file._id}
              className="border rounded-lg p-4 bg-white shadow-md"
            >
              <h2 className="text-lg font-bold text-blue-700">
                {file.fileName}
              </h2>
              <p className="text-sm text-gray-700 mt-1">
                {file.description || "No description"}
              </p>
              <p className="text-xs text-gray-500 italic mt-1">
                Category: {file.category}
                {file.userName}
              </p>
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-blue-600 font-semibold hover:underline"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilesPage
