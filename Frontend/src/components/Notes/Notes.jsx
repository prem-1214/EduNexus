import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const notes = [
  { title: "Product Team Meeting", category: ["Weekly", "Product"], description: "This monthly progress agenda is following this items:", author: "Floyd Miles", date: "Mar 5 04:25" },
  { title: "Product Team Meeting", category: ["Monthly", "Business"], description: "Some Summaries of this weeks meeting with some conclusion we get:", author: "Brooklyn Simmons", date: "Aug 15 10:29" },
  { title: "HR Interview", category: ["Personal", "Business"], description: "This monthly progress agenda is following this items:", author: "Annette Black", date: "Jan 23 14:31" },
  { title: "Document Images", category: ["Personal"], description: "Report Document of Weekly Meetings", author: "Cameron Williamson", date: "Dec 30 21:28" },
  { title: "Monthly Team Progress", category: ["Monthly", "Product"], description: "This monthly progress agenda is following this items:", author: "Robert Fox", date: "Jan 31 09:53" },
];

const Notes = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 pl-20 md:pl-64 overflow-y-auto">
        <Navbar />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Notes</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border rounded">Sort By</button>
            <button className="px-4 py-2 border rounded">Filter</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">+ Add Notes</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {notes.map((note, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              <div className="flex space-x-2 mb-2">
                {note.category.map((cat, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">{cat}</span>
                ))}
              </div>
              <h2 className="text-lg font-bold">{note.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{note.description}</p>
              <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                <span>{note.author}</span>
                <span>{note.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;