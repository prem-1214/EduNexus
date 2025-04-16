import React, { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import listPlugin from "@fullcalendar/list"
import { v4 as uuidv4 } from "uuid" // for unique event IDs
import { useTheme } from "../../Context/ThemeContext.jsx"

const CalendarPage = () => {
  const { isDarkMode } = useTheme() // Access dark mode state
  const [events, setEvents] = useState([
    {
      id: uuidv4(),
      title: "Holiday: Independence Day",
      date: "2025-08-15",
      color: "green",
    },
    { id: uuidv4(), title: "Exam: Math", date: "2025-04-10", color: "red" },
    {
      id: uuidv4(),
      title: "Lecture: Physics",
      date: "2025-04-12",
      color: "blue",
    },
  ])

  const handleDateClick = (info) => {
    const title = prompt(`Enter event for ${info.dateStr}`)
    if (title) {
      const newEvent = {
        id: uuidv4(),
        title,
        date: info.dateStr,
        color: "blue", // Default color for new events
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
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-purple-200 to-blue-200 text-gray-900"
      } p-6 sm:p-10`}
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold drop-shadow">📅 Calendar</h1>
        <p className="mt-2 text-lg">
          Add, edit, or delete events. Highlight holidays, exams, and lectures.
        </p>
        <p className="text-sm mt-1">
          Click on a date to add an event or click an event to edit/delete it.
        </p>
      </header>

      <div
        className={`max-w-7xl mx-auto rounded-xl shadow-lg p-6 ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
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
          eventColor={isDarkMode ? "gray" : "blue"}
          themeSystem="standard"
          eventBackgroundColor={(info) =>
            info.event.extendedProps.color || "blue"
          }
        />
      </div>
    </div>
  )
}

export default CalendarPage
