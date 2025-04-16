import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../Context/ThemeContext.jsx"

const UploadFilePage = () => {
  const { isDarkMode } = useTheme() // Access dark mode state
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Notes")
  const [program, setProgram] = useState("B.Tech")
  const [branch, setBranch] = useState("")
  const [semester, setSemester] = useState(1)
  const [subject, setSubject] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const navigate = useNavigate()

  const branchesByProgram = {
    "B.Tech": ["CSE", "ECE", "EEE", "ME", "CE"],
    "B.Sc": ["Physics", "Chemistry", "Maths"],
    BCA: ["General"],
    BBA: ["General"],
    Other: ["General"],
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)
    formData.append("fileName", fileName)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("program", program)
    formData.append("branch", branch)
    formData.append("semester", semester)
    formData.append("subject", subject)

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
      setProgram("B.Tech")
      setBranch("")
      setSemester(1)
      setSubject("")
      setError("")
      setSuccess("File uploaded successfully.")
      navigate("/my-files")
    } catch (err) {
      console.error("Upload failed:", err)
      setError("File upload failed. Please try again.")
      setSuccess("")
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-purple-200 to-blue-200 text-gray-900"
      } p-6 sm:p-10`}
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md mb-10 border border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-blue-900 dark:text-blue-400 mb-6">
          📤 Upload a File
        </h2>

        <form onSubmit={handleUpload} className="space-y-6">
          {/* File */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Choose File
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* File Name */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="Notes">Notes</option>
              <option value="Assignments">Assignments</option>
              <option value="Resources">Resources</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Program */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Program
            </label>
            <select
              value={program}
              onChange={(e) => {
                setProgram(e.target.value)
                setBranch("") // reset branch on program change
              }}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {Object.keys(branchesByProgram).map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Branch
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            >
              <option value="">-- Select Branch --</option>
              {branchesByProgram[program].map((br) => (
                <option key={br} value={br}>
                  {br}
                </option>
              ))}
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Semester
            </label>
            <select
              value={semester}
              onChange={(e) => setSemester(parseInt(e.target.value))}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semester {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Upload File
          </button>
        </form>

        {error && (
          <p className="font-medium text-red-500 text-center mt-4">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}
      </div>
    </div>
  )
}

export default UploadFilePage
