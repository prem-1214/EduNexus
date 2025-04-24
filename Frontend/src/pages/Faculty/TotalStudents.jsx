import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "../../Context/ThemeContext.jsx"; // Import ThemeContext

const TotalStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme(); // Access ThemeContext

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/video/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDarkMode ? "bg-[#1E1E2F] text-[#F8FAFC]" : "bg-[#FAFAFA] text-[#1F2937]"
        }`}
      >
        <Loader2 className="w-8 h-8 animate-spin text-[#1FAA59]" />
        <p className="ml-3 text-lg font-semibold">Loading students...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-10 sm:px-8 transition-colors duration-300 ${
        isDarkMode ? "bg-[#1E1E2F] text-[#F8FAFC]" : "bg-[#FAFAFA] text-[#1F2937]"
      }`}
    >
      <header className="text-center mb-10">
        <h1
          className={`text-4xl font-semibold drop-shadow-sm ${
            isDarkMode ? "text-blue-400" : "text-[#1E1E7E]"
          }`}
        >
          🎓 Students
        </h1>
        <p className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-[#374151]"}`}>
          View all registered students and their contact info.
        </p>
      </header>

      <Card
        className={`backdrop-blur-xl ${
          isDarkMode
            ? "bg-gray-900/80 border-gray-700"
            : "bg-white/80 border-[#E5E7EB]"
        } shadow-xl rounded-2xl`}
      >
        <CardContent className="p-4">
          <DataTable
            value={students}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            stripedRows
            className={`font-nunito rounded-xl ${
              isDarkMode
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-white text-gray-800 border-gray-300"
            }`}
            responsiveLayout="scroll"
            emptyMessage={
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No students found
              </span>
            }
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            paginatorClassName={`${
              isDarkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          >
            <Column
              field="userName"
              header="Username"
              sortable
              style={{
                minWidth: "200px",
                backgroundColor: isDarkMode ? "#2D2D3A" : "#F9FAFB",
                color: isDarkMode ? "#F8FAFC" : "#1F2937",
              }}
            />
            <Column
              field="email"
              header="Email"
              sortable
              style={{
                minWidth: "250px",
                backgroundColor: isDarkMode ? "#2D2D3A" : "#F9FAFB",
                color: isDarkMode ? "#F8FAFC" : "#1F2937",
              }}
            />
          </DataTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default TotalStudents;