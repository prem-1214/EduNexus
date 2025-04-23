import { useEffect, useState } from "react"
import axios from "axios"
import { useTheme } from "../../context/ThemeContext.jsx"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"

const FilesPage = () => {
  const { isDarkMode } = useTheme()
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [viewMode, setViewMode] = useState("table")

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

  const downloadTemplate = (rowData) => {
    return (
      <a
        href={rowData.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
      >
        Download
      </a>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#FAFAFA] text-[#1F2937]"
      } p-6 sm:p-10`}
    >
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700">
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
          <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl">
            <DataTable
              value={uploadedFiles}
              paginator
              rows={6}
              className="p-datatable-sm"
              stripedRows
              removableSort
              emptyMessage="No files found."
              responsiveLayout="scroll"
            >
              <Column field="fileName" header="File Name" sortable filter />
              <Column field="description" header="Description" sortable filter />
              <Column field="category" header="Category" sortable filter />
              <Column field="program" header="Program" sortable filter />
              <Column field="branch" header="Branch" sortable filter />
              <Column field="semester" header="Semester" sortable filter />
              <Column field="subject" header="Subject" sortable filter />
              <Column
                field="uploadedAtFormatted"
                header="Uploaded"
                sortable
                filter
              />
              <Column header="Actions" body={downloadTemplate} />
            </DataTable>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploadedFiles.slice(0, 6).map((file) => (
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
                    <strong>Uploaded:</strong> {file.uploadedAtFormatted || "N/A"}
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
      </div>
    </div>
  )
}

export default FilesPage
