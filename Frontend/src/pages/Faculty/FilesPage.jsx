import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../Context/ThemeContext.jsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useNavigate } from "react-router-dom";

const FilesPage = () => {
  const { isDarkMode } = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewMode, setViewMode] = useState("table");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/file/my-files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUploadedFiles(response.data.files);
        setError("");
      } catch (error) {
        console.error("Error fetching files:", error);
        setError("Failed to fetch files. Please try again later.");
        setSuccess("");
      }
    };

    fetchFiles();
  }, []);

  const downloadTemplate = (rowData) => {
    return (
      <a
        href={rowData.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-green-400 font-semibold hover:underline"
      >
        Download
      </a>
    );
  };

  const editTemplate = (rowData) => {
    const navigate = useNavigate();

    return (
      <button
        onClick={() => navigate(`/editFile/${rowData._id}`, { state: { file: rowData } })}
        className="text-blue-600 dark:text-green-400 font-semibold hover:underline"
      >
        Edit
      </button>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 px-4 py-10 sm:px-10 ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#FAFAFA] text-[#1F2937]"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto glassmorphism p-8 rounded-2xl shadow-xl border ${
          isDarkMode
            ? "bg-[#1E293B] border-[#334155]"
            : "bg-white border-[#E5E7EB]"
        }`}
      >
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#1E1E7E] dark:text-green-400">
            📁 My Files
          </h1>
          <button
            className="bg-[#1FAA59] hover:bg-[#16A34A] text-white px-4 py-2 rounded-lg transition"
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
            <DataTable
              value={uploadedFiles}
              paginator
              rows={6}
              className={`p-datatable-sm ${
                isDarkMode
                  ? "bg-[#1E293B] text-[#F8FAFC] border-[#334155]"
                  : "bg-white text-[#1F2937] border-[#E5E7EB]"
              }`}
              stripedRows
              removableSort
              emptyMessage={
                <span
                  className={`font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  No files found.
                </span>
              }
              responsiveLayout="scroll"
              paginatorClassName={`${
                isDarkMode
                  ? "bg-[#1E293B] text-[#F8FAFC] border-[#334155]"
                  : "bg-gray-100 text-[#1F2937] border-[#E5E7EB]"
              }`}
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            >
              <Column
                field="fileName"
                header="File Name"
                sortable
                filter
                style={{
                  backgroundColor: isDarkMode ? "#1E293B" : "#F9FAFB",
                  color: isDarkMode ? "#F8FAFC" : "#1F2937",
                }}
              />
              <Column
                field="description"
                header="Description"
                sortable
                filter
                style={{
                  backgroundColor: isDarkMode ? "#1E293B" : "#F9FAFB",
                  color: isDarkMode ? "#F8FAFC" : "#1F2937",
                }}
              />
              <Column
                field="category"
                header="Category"
                sortable
                filter
                style={{
                  backgroundColor: isDarkMode ? "#1E293B" : "#F9FAFB",
                  color: isDarkMode ? "#F8FAFC" : "#1F2937",
                }}
              />
              <Column
                field="program"
                header="Program"
                sortable
                filter
                style={{
                  backgroundColor: isDarkMode ? "#1E293B" : "#F9FAFB",
                  color: isDarkMode ? "#F8FAFC" : "#1F2937",
                }}
              />
              <Column
                field="branch"
                header="Branch"
                sortable
                filter
                style={{
                  backgroundColor: isDarkMode ? "#1E293B" : "#F9FAFB",
                  color: isDarkMode ? "#F8FAFC" : "#1F2937",
                }}
              />
              <Column
                field="semester"
                header="Semester"
                sortable
                filter
                style={{
                  backgroundColor: isDarkMode ? "#1E293B" : "#F9FAFB",
                  color: isDarkMode ? "#F8FAFC" : "#1F2937",
                }}
              />
              <Column
                field="subject"
                header="Subject"
                sortable
                filter
                style={{
                  backgroundColor: isDarkMode ? "#1E293B" : "#F9FAFB",
                  color: isDarkMode ? "#F8FAFC" : "#1F2937",
                }}
              />
              <Column
                field="uploadedAtFormatted"
                header="Uploaded"
                sortable
                filter
                style={{
                  backgroundColor: isDarkMode ? "#1E293B" : "#F9FAFB",
                  color: isDarkMode ? "#F8FAFC" : "#1F2937",
                }}
              />
              <Column header="Actions" body={downloadTemplate} />
              <Column header="Edit" body={editTemplate} />
            </DataTable>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploadedFiles.slice(0, 6).map((file) => (
              <div
                key={file._id}
                className={`rounded-lg shadow-md p-6 transition transform hover:scale-105 ${
                  isDarkMode
                    ? "bg-[#1E293B] border-[#334155]"
                    : "bg-white border-[#E5E7EB]"
                }`}
              >
                <h2 className="text-lg font-bold text-[#1E1E7E] dark:text-green-400">
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
                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={file.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-green-400 font-semibold hover:underline"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => navigate(`/editFile/${file._id}`, { state: { file } })}
                    className="text-blue-600 dark:text-green-400 font-semibold hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilesPage;