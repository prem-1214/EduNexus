import React, { useEffect, useState } from "react"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import "primereact/resources/themes/lara-light-blue/theme.css"
import "primereact/resources/primereact.min.css"
import { useTheme } from "../../Context/ThemeContext.jsx"
import api from "../../utils/axiosInstance.js"

const TotalStudents = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/video/students")
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
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode
            ? "bg-[#0F172A] text-[#F8FAFC]"
            : "bg-[#FAFAFA] text-[#1F2937]"
        }`}
      >
        <Loader2 className="w-8 h-8 animate-spin text-[#1FAA59]" />
        <p className="ml-3 text-lg font-semibold">Loading students...</p>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen px-6 py-8 sm:px-12 transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#FAFAFA] text-[#1F2937]"
      }`}
    >
      <header className="text-center mb-8">
        <h1
          className={`text-4xl font-bold ${
            isDarkMode ? "text-green-400" : "text-[#1E1E7E]"
          }`}
        >
          🎓 Total Students
        </h1>
        <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          View and manage all registered students.
        </p>
      </header>

      <div
        className={`max-w-7xl mx-auto rounded-lg shadow-lg p-6 ${
          isDarkMode
            ? "bg-[#1E293B] border-[#334155]"
            : "bg-white border-[#E5E7EB]"
        }`}
      >
        <DataTable
          value={students}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 20]}
          stripedRows
          className={`rounded-lg border ${
            isDarkMode
              ? "bg-[#1E293B] text-[#F8FAFC] border-[#334155]"
              : "bg-white text-[#1F2937] border-[#E5E7EB]"
          }`}
          responsiveLayout="scroll"
          emptyMessage={
            <span
              className={`font-medium ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No students found.
            </span>
          }
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          paginatorClassName={`${
            isDarkMode
              ? "bg-[#1E293B] text-[#F8FAFC] border-[#334155]"
              : "bg-gray-100 text-[#1F2937] border-[#E5E7EB]"
          }`}
        >
          <Column
            field="userName"
            header="Username"
            sortable
            style={{
              minWidth: "200px",
              backgroundColor: isDarkMode ? "#2D3748" : "#F7FAFC",
              color: isDarkMode ? "#F8FAFC" : "#1F2937",
            }}
          />
          <Column
            field="email"
            header="Email"
            sortable
            style={{
              minWidth: "250px",
              backgroundColor: isDarkMode ? "#2D3748" : "#F7FAFC",
              color: isDarkMode ? "#F8FAFC" : "#1F2937",
            }}
          />
        </DataTable>
      </div>
    </div>
  )
}

export default TotalStudents
