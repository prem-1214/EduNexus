import React, { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import { v4 as uuidv4 } from "uuid"
import { useTheme } from "../../Context/ThemeContext.jsx"
import { Card } from "@/components/ui/card"

const CalendarPage = () => {
  const { isDarkMode } = useTheme()
  const [events, setEvents] = useState([
    {
      id: uuidv4(),
      title: "Holiday: Independence Day",
      date: "2025-08-15",
      color: "#1FAA59",
    },
    { id: uuidv4(), title: "Exam: Math", date: "2025-04-10", color: "#EF4444" },
    {
      id: uuidv4(),
      title: "Lecture: Physics",
      date: "2025-04-12",
      color: "#3B82F6",
    },
  ])

  const handleDateClick = (info) => {
    const title = prompt(`Enter event for ${info.dateStr}`)
    if (title) {
      const newEvent = {
        id: uuidv4(),
        title,
        date: info.dateStr,
        color: "#3B82F6",
      }
      setEvents((prev) => [...prev, newEvent])
    }
  }

  const handleEventClick = (info) => {
    const action = prompt(
      `Edit or delete event: "${info.event.title}"? Type "edit" to edit or "delete" to delete.`
    )
    if (action === "edit") {
      const newTitle = prompt("Enter new title:", info.event.title)
      if (newTitle) {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === info.event.id ? { ...event, title: newTitle } : event
          )
        )
      }
    } else if (action === "delete") {
      const confirmDelete = window.confirm(
        `Delete event: "${info.event.title}"?`
      )
      if (confirmDelete) {
        setEvents((prev) => prev.filter((event) => event.id !== info.event.id))
      }
    }
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 p-6 sm:p-10 ${
        isDarkMode
          ? "bg-[#1E1E2F] text-[#F8FAFC]"
          : "bg-[#FAFAFA] text-[#1F2937]"
      }`}
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold drop-shadow-sm">📅 Calendar</h1>
        <p className="mt-2 text-lg font-medium text-[#1FAA59]">
          Add, edit, or delete events. Highlight holidays, exams, and lectures.
        </p>
        <p className="text-sm mt-1 text-muted-foreground">
          Click on a date to add an event or click an event to edit/delete it.
        </p>
      </header>

      <Card
        className={`max-w-7xl mx-auto rounded-2xl shadow-xl p-6 backdrop-blur-lg border ${
          isDarkMode
            ? "bg-[#1E293B]/80 border-[#334155]"
            : "bg-white/70 border-[#E5E7EB]"
        }`}
      >
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          events={events}
          editable={true}
          selectable={true}
          eventDisplay="block"
          height="auto"
          themeSystem="standard"
        />
      </Card>
    </div>
  )
}

export default CalendarPage
