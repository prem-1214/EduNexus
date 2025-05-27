import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaSearch } from "react-icons/fa"
import { useTheme } from "../../../Context/ThemeContext"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import "primereact/resources/themes/lara-light-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import api from "../../../utils/axiosInstance"

const StudentFilesPage = () => {
  const [files, setFiles] = useState([])
  const [filteredFiles, setFilteredFiles] = useState([])
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState("card")
  const [search, setSearch] = useState("")
  const [program, setProgram] = useState("")
  const [branch, setBranch] = useState("")
  const [semester, setSemester] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const filesPerPage = 6


  const { isDarkMode } = useTheme()

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await api.get("/file/all-files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        setFiles(response.data.files || [])
        setError("")
      } catch (err) {
        console.error("Error fetching files:", err)
        setError("Failed to fetch files. Please try again later.")
      }
    }
    fetchFiles()
  }, [])

  useEffect(() => {
    let tempFiles = [...files]
    if (program) tempFiles = tempFiles.filter((f) => f.program === program)
    if (branch) tempFiles = tempFiles.filter((f) => f.branch === branch)
    if (semester) tempFiles = tempFiles.filter((f) => f.semester === semester)
    if (search)
      tempFiles = tempFiles.filter((f) =>
        f.fileName.toLowerCase().includes(search.toLowerCase())
      )
    if (sortOption === "newest") {
      tempFiles.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    } else if (sortOption === "name") {
      tempFiles.sort((a, b) => a.fileName.localeCompare(b.fileName))
    }
    setFilteredFiles(tempFiles)
  }, [files, search, program, branch, semester, sortOption])

  const totalPages = Math.ceil(filteredFiles.length / filesPerPage)
  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * filesPerPage,
    currentPage * filesPerPage
  )

  const handlePageChange = (newPage) => setCurrentPage(newPage)

  return (
    <div
      className={`p-6 pt-20 transition-all duration-300 ${
        isDarkMode ? "bg-[#1E1E2F] text-[#F8FAFC]" : "bg-[#F9FAFB] text-[#1F2937]"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">📁 Shared Files</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded ${
              viewMode === "card"
                ? "bg-blue-600 text-white"
                : isDarkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded ${
              viewMode === "table"
                ? "bg-blue-600 text-white"
                : isDarkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Table View
          </button>
        </div>

        <div className="relative w-full max-w-sm">
          <FaSearch
            className={`absolute top-3 left-3 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          />
          <input
            type="text"
            placeholder="Search by file name"
            className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring ${
              isDarkMode
                ? "bg-[#1E293B] text-[#F8FAFC] border-gray-600 focus:border-blue-500"
                : "bg-white text-gray-800 border-gray-300 focus:border-blue-400"
            }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {["Program", "Branch", "Semester", "Sort"].map((label, idx) => (
          <select
            key={idx}
            value={{ Program: program, Branch: branch, Semester: semester, Sort: sortOption }[label]}
            onChange={(e) =>
              ({ Program: setProgram, Branch: setBranch, Semester: setSemester, Sort: setSortOption }[label](e.target.value))
            }
            className={`border rounded-md px-3 py-2 ${
              isDarkMode
                ? "bg-[#1E293B] text-[#F8FAFC] border-gray-600"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            <option value="">All {label}s</option>
            {label === "Program" && ["B.Tech", "B.Sc", "BBA"].map((val) => <option key={val}>{val}</option>)}
            {label === "Branch" && ["CSE", "ECE", "ME", "CE"].map((val) => <option key={val}>{val}</option>)}
            {label === "Semester" && [...Array(8).keys()].map((i) => <option key={i + 1}>{i + 1}</option>)}
            {label === "Sort" && ["newest", "name"].map((val) => <option key={val}>{val}</option>)}
          </select>
        ))}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Table View */}
      {viewMode === "table" ? (
        <div className="card">
          <DataTable
            value={paginatedFiles}
            paginator
            rows={filesPerPage}
            totalRecords={filteredFiles.length}
            onPage={(e) => setCurrentPage(e.page + 1)}
            paginatorTemplate="PrevPageLink PageLinks NextPageLink"
            className={isDarkMode ? "p-datatable-dark" : ""}
            scrollable
            scrollHeight="400px"
            stripedRows
            responsiveLayout="scroll"
          >
            <Column field="fileName" header="File Name" sortable />
            <Column field="description" header="Description" sortable />
            <Column field="category" header="Category" sortable />
            <Column field="program" header="Program" sortable />
            <Column field="branch" header="Branch" sortable />
            <Column field="semester" header="Semester" sortable />
            <Column
              header="Uploaded By" sortable
              body={(rowData) => rowData.owner?.userName || "Unknown"}
            />
            <Column
              header="Download"
              body={(rowData) => (
                <a
                  href={rowData.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-blue-500 hover:underline ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Download
                </a>
              )}
            />
          </DataTable>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedFiles.map((file) => (
            <div
              key={file._id}
              className={`p-5 rounded-xl shadow-lg ${
                isDarkMode ? "bg-[#1E293B] text-[#F8FAFC]" : "bg-white text-gray-800"
              }`}
            >
              <h2 className="text-lg font-semibold truncate">📄 {file.fileName}</h2>
              <p className="text-sm mt-1">{file.description}</p>
              <p className="text-xs mt-1 italic">
                {file.category} | {file.program}-{file.branch} | Semester {file.semester}
              </p>
              <p className="text-xs mt-1">
                Uploaded by: {file.owner?.userName || "Unknown"}
              </p>
              <a
                href={file.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 inline-block font-semibold hover:underline ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
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

export default StudentFilesPage
