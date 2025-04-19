import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const TotalStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/video/students")
        setStudents(response.data)
      } catch (error) {
        console.error("Error fetching students:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FAFAFA]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1FAA59]" />
        <p className="ml-3 text-lg font-semibold text-[#374151] font-nunito">
          Loading students...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 py-10 sm:px-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-[#1E1E7E] font-poppins drop-shadow-sm">
          🎓 Students
        </h1>
        <p className="mt-2 text-[#374151] font-nunito text-lg">
          View all registered students and their contact info.
        </p>
      </header>

      <Card className="backdrop-blur-xl bg-white/80 border border-[#E5E7EB] shadow-xl rounded-2xl">
        <CardContent className="overflow-x-auto p-0">
          <table className="min-w-full divide-y divide-[#E5E7EB] font-nunito text-sm text-left">
            <thead className="bg-[#E0F7F1] text-[#1E1E7E]">
              <tr>
                <th className="py-4 px-6 font-medium">Username</th>
                <th className="py-4 px-6 font-medium">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#F8FAFC]" : "bg-white"
                  } hover:bg-[#E0F7F1]/60 transition duration-200`}
                >
                  <td className="py-3 px-6 text-[#1E1E7E] font-medium">
                    {student.userName}
                  </td>
                  <td className="py-3 px-6 text-[#374151]">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

export default TotalStudents
