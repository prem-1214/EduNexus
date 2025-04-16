import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const StudentFilesPage = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("card");
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 6;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/file/all-files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setFiles(response.data.files || []);
        setError("");
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to fetch files. Please try again later.");
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    let tempFiles = [...files];

    if (program) tempFiles = tempFiles.filter((f) => f.program === program);
    if (branch) tempFiles = tempFiles.filter((f) => f.branch === branch);
    if (semester) tempFiles = tempFiles.filter((f) => f.semester === semester);
    if (search) tempFiles = tempFiles.filter((f) => f.fileName.toLowerCase().includes(search.toLowerCase()));

    if (sortOption === "newest") {
      tempFiles.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    } else if (sortOption === "name") {
      tempFiles.sort((a, b) => a.fileName.localeCompare(b.fileName));
    }

    setFilteredFiles(tempFiles);
  }, [files, search, program, branch, semester, sortOption]);

  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);
  const paginatedFiles = filteredFiles.slice((currentPage - 1) * filesPerPage, currentPage * filesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📁 Shared Files</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded ${viewMode === "card" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Card View
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded ${viewMode === "table" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Table View
          </button>
        </div>

        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by file name"
            className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <select value={program} onChange={(e) => setProgram(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="">All Programs</option>
          <option value="B.Tech">B.Tech</option>
          <option value="B.Sc">B.Sc</option>
          <option value="BBA">BBA</option>
        </select>
        <select value={branch} onChange={(e) => setBranch(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
          <option value="CE">CE</option>
        </select>
        <select value={semester} onChange={(e) => setSemester(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="">All Semesters</option>
          {[...Array(8).keys()].map(i => (
            <option key={i+1} value={i+1}>Semester {i+1}</option>
          ))}
        </select>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border rounded-md px-3 py-2">
          <option value="newest">Newest First</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {viewMode === "table" ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">File Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Program</th>
              <th className="border px-4 py-2">Branch</th>
              <th className="border px-4 py-2">Semester</th>
              <th className="border px-4 py-2">Uploaded By</th>
              <th className="border px-4 py-2">Download</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFiles.map(file => (
              <tr key={file._id}>
                <td className="border px-4 py-2">{file.fileName}</td>
                <td className="border px-4 py-2">{file.description}</td>
                <td className="border px-4 py-2">{file.category}</td>
                <td className="border px-4 py-2">{file.program}</td>
                <td className="border px-4 py-2">{file.branch}</td>
                <td className="border px-4 py-2">{file.semester}</td>
                <td className="border px-4 py-2">{file.owner?.userName || "Unknown"}</td>
                <td className="border px-4 py-2">
                  <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedFiles.map((file) => (
            <div key={file._id} className="bg-white p-5 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 truncate">📄 {file.fileName}</h2>
              <p className="text-sm text-gray-600 mt-1">{file.description}</p>
              <p className="text-xs text-gray-500 mt-1 italic">
                {file.category} | {file.program}-{file.branch} | Semester {file.semester}
              </p>
              <p className="text-xs mt-1 text-gray-400">Uploaded by: {file.owner?.userName || "Unknown"}</p>
              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-600 font-semibold hover:underline">Download</a>
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
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border text-white ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentFilesPage;
