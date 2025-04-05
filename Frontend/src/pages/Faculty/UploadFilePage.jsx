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
      console.log("Uploaded files:", response.data);
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
        console.log("File uploaded successfully!");
        
      fetchFiles(); // Refresh list
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Upload File</h2>
      <form onSubmit={handleUpload} className="mb-6 space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <input
          type="text"
          placeholder="File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Notes">Notes</option>
          <option value="Assignments">Assignments</option>
          <option value="Resources">Resources</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      <h3 className="text-xl font-semibold">My Uploaded Files</h3>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file._id} className="mb-2">
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {file.fileName}
            </a>
            <p className="text-sm">{file.description}</p>
            <p className="text-xs text-gray-500">Category: {file.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUploadPage;
