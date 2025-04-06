import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const FileUploadPage = () => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Notes")
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const navigate = useNavigate()

  // const fetchFiles = async () => {
  //   try {
  //     const response = await axios.get("/file/my-files", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     })
  //     setUploadedFiles(response.data)
  //     setError("") 
  //     setSuccess("Files fetched successfully.")
  //   } catch (err) {
  //     console.error("Error fetching files:", err)
  //     setError("Failed to fetch files. Please try again later.")
  //     setSuccess("")
  //   }
  // }

  // useEffect(() => {
  //   fetchFiles()
  // }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)
    formData.append("fileName", fileName)
    formData.append("description", description)
    formData.append("category", category)

    try {
      await axios.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      
      setFile(null)
      setFileName("")
      setDescription("")
      setCategory("Notes")

      setError("")
      setSuccess("File uploaded successfully.")

      navigate("/my-files")

    } catch (err) {
      console.error("Upload failed:", err)
      setError("File upload failed. Please try again.")
      setSuccess("")
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
          {error && <p className="font-medium text-red-500 text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </div>

     
    </div>
  );
};

export default FileUploadPage;
