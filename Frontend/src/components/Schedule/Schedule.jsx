import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";

const Schedule = () => {
  const [selectedView, setSelectedView] = useState("Monthly");
  const events = [
    { date: "2023-09-05", title: "Meeting", time: "11:30 - 13:00", color: "bg-yellow-200 text-yellow-700" },
    { date: "2023-09-09", title: "Design Review", time: "10:30 - 11:00", color: "bg-red-200 text-red-700" },
    { date: "2023-09-09", title: "Discussion", time: "10:00 - 11:00", color: "bg-purple-200 text-purple-700" },
    { date: "2023-09-14", title: "Market Research", time: "", color: "bg-green-200 text-green-700" },
    { date: "2023-09-19", title: "Design Review", time: "", color: "bg-red-200 text-red-700" },
    { date: "2023-09-28", title: "Meeting", time: "", color: "bg-yellow-200 text-yellow-700" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 pl-20 md:pl-64 overflow-y-auto overflow-x-hidden">
        <Navbar />
        <h1 className="text-2xl font-bold mt-4">Calendar</h1>
        <div className="flex space-x-4 mt-4 border-b">
          {["Monthly", "Weekly", "Daily"].map((view) => (
            <button
              key={view}
              className={`p-2 ${selectedView === view ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
              onClick={() => setSelectedView(view)}
            >
              {view}
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button className="border p-2 rounded">September 2023 ▼</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Event</button>
        </div>
        <div className="mt-4 bg-white shadow rounded-lg p-4 grid grid-cols-7 gap-2">
          {[...Array(30)].map((_, index) => {
            const date = `2023-09-${String(index + 1).padStart(2, "0")}`;
            return (
              <div key={index} className="border p-2 min-h-[100px] relative">
                <span className="text-gray-500 text-sm">{index + 1}</span>
                {events.filter((event) => event.date === date).map((event, i) => (
                  <div key={i} className={`mt-1 p-1 text-xs rounded ${event.color}`}>{event.title}</div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Schedule;