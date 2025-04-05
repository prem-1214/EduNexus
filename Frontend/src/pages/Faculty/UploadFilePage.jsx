import { useEffect, useState } from "react";
import axios from "axios";

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Notes");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("/file/my-files", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUploadedFiles(response.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("description", description);
    formData.append("category", category);

    try {
      await axios.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setFile(null);
      setFileName("");
      setDescription("");
      setCategory("Notes");
      fetchFiles();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-200 p-6 sm:p-10">
      {/* Upload Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md mb-10">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">📤 Upload a File</h2>

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Choose File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">File Name</label>
            <input
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Describe the file..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
            >
              <option value="Notes">Notes</option>
              <option value="Assignments">Assignments</option>
              <option value="Resources">Resources</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Upload File
          </button>
        </form>
      </div>

      {/* Uploaded Files Section */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">📁 My Uploaded Files</h3>

        {uploadedFiles.length === 0 ? (
          <p className="text-center text-gray-600">You haven't uploaded any files yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploadedFiles.map((file) => (
              <div
                key={file._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition"
              >
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 font-bold text-lg truncate hover:underline"
                >
                  Name: {file.fileName}
                </a>
                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-semibold">Description:</span> {file.description}
                </p>
                <p className="mt-2 text-xs text-gray-500 italic">Category: {file.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadPage;
