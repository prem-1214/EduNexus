import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    const title = prompt("Enter note or lecture title for " + info.dateStr);
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  return (
    <div className="p-8 bg-gray-50  min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Calendar</h1>
        <p className="text-gray-600 mt-2">
          Add lectures, notes, or reminders by clicking on a date.
        </p>
      </header>

      <div className="bg-white shadow-lg rounded-lg p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          height="auto"
        />
      </div>
    </div>
  );
};

export default CalendarPage;
