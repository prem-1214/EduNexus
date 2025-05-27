import { useState } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useTheme } from "../../Context/ThemeContext.jsx"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import api from "../../utils/axiosInstance.js"

const UploadFilePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDarkMode } = useTheme()

  // Check if editing an existing file
  const editingFile = location.state?.file || null

  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(editingFile?.fileName || "")
  const [description, setDescription] = useState(editingFile?.description || "")
  const [category, setCategory] = useState(editingFile?.category || "Notes")
  const [program, setProgram] = useState(editingFile?.program || "B.Tech")
  const [branch, setBranch] = useState(editingFile?.branch || "")
  const [semester, setSemester] = useState(editingFile?.semester || 1)
  const [subject, setSubject] = useState(editingFile?.subject || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const branchesByProgram = {
    "B.Tech": ["CSE", "ECE", "EEE", "ME", "CE"],
    "B.Sc": ["Physics", "Chemistry", "Maths"],
    BCA: ["General"],
    BBA: ["General"],
    Other: ["General"],
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (file) formData.append("file", file)
    formData.append("fileName", fileName)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("program", program)
    formData.append("branch", branch)
    formData.append("semester", semester)
    formData.append("subject", subject)

    try {
      await api.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })

      navigate("/my-files")
    } catch (err) {
      console.error("Error submitting file:", err)
      setError("File submission failed. Please try again.")
    }
  }

  return (
    <div
      className={`min-h-screen transition duration-300 px-4 py-10 sm:px-10 ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#FAFAFA] text-[#1F2937]"
      }`}
    >
      <Card
        className={`max-w-3xl mx-auto glassmorphism p-8 rounded-2xl shadow-xl border ${
          isDarkMode
            ? "bg-[#1E293B] border-[#334155]"
            : "bg-white border-[#E5E7EB]"
        }`}
      >
        <h2 className="text-3xl font-semibold text-center text-[#1E1E7E] dark:text-green-400 mb-8">
          📤 {editingFile ? "Edit File" : "Upload a File"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <div>
            <label className="block font-medium mb-1">Choose File</label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
            />
          </div> */}

          <div>
            <label className="block font-medium mb-1">File Name</label>
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg px-4 py-2 border bg-gray-50 dark:bg-gray-800"
            >
              <option value="Notes">Notes</option>
              <option value="Assignments">Assignments</option>
              <option value="Resources">Resources</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Program</label>
            <select
              value={program}
              onChange={(e) => {
                setProgram(e.target.value)
                setBranch("")
              }}
              className="w-full rounded-lg px-4 py-2 border bg-gray-50 dark:bg-gray-800"
            >
              {Object.keys(branchesByProgram).map((prog) => (
                <option key={prog} value={prog}>
                  {prog}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Branch</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
              className="w-full rounded-lg px-4 py-2 border bg-gray-50 dark:bg-gray-800"
            >
              <option value="">-- Select Branch --</option>
              {branchesByProgram[program].map((br) => (
                <option key={br} value={br}>
                  {br}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(parseInt(e.target.value))}
              className="w-full rounded-lg px-4 py-2 border bg-gray-50 dark:bg-gray-800"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semester {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Enter subject"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1FAA59] hover:bg-[#16A34A] text-white"
          >
            {editingFile ? "Update File" : "Upload File"}
          </Button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mt-4 font-medium">
            {success}
          </p>
        )}
      </Card>
    </div>
  )
}

export default UploadFilePage
