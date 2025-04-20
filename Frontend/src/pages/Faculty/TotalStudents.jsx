import React, { useEffect, useState } from "react"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import "primereact/resources/themes/lara-light-blue/theme.css"
import "primereact/resources/primereact.min.css"
import { Card, CardContent } from "@/components/ui/card"

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
        <CardContent className="p-4">
          <DataTable
            value={students}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            stripedRows
            className="bg-white/90 font-nunito rounded-xl"
            responsiveLayout="scroll"
            emptyMessage="No students found"
          >
            <Column
              field="userName"
              header="Username"
              sortable
              style={{ minWidth: "200px" }}
            />
            <Column
              field="email"
              header="Email"
              sortable
              style={{ minWidth: "250px" }}
            />
          </DataTable>
        </CardContent>
      </Card>
    </div>
  )
}

export default TotalStudents
