import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuidv4 } from "uuid"; // for unique event IDs

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    const title = prompt(`Enter lecture, note, or reminder for ${info.dateStr}`);
    if (title) {
      const newEvent = {
        id: uuidv4(),
        title,
        date: info.dateStr,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  const handleEventClick = (info) => {
    const confirmDelete = window.confirm(`Delete event: "${info.event.title}"?`);
    if (confirmDelete) {
      setEvents((prev) => prev.filter((event) => event.id !== info.event.id));
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-200 to-blue-200 min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow">📅 Calendar</h1>
        <p className="text-gray-700 mt-2 text-lg">
          Click on a date to add lectures, notes, or reminders.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Click an event to delete it.
        </p>
      </header>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          events={events}
          height="auto"
          eventDisplay="block"
        />
      </div>
    </div>
  );
};

export default CalendarPage;
