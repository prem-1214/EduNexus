import { useState } from "react";
import { FaSearch, FaStickyNote } from "react-icons/fa";

const initialNotes = [
  {
    id: 1,
    title: "React Basics",
    content: "Components, props, and state management using hooks...",
  },
  {
    id: 2,
    title: "Tailwind CSS Guide",
    content: "Utility-first CSS framework for rapidly building UI...",
  },
  {
    id: 3,
    title: "Node.js Notes",
    content: "Event-driven JavaScript runtime built on Chrome's V8...",
  },
];

const Notes = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📝 Notes</h1>

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => <NoteCard key={note.id} {...note} />)
        ) : (
          <p className="text-gray-500 col-span-full">No matching notes found.</p>
        )}
      </div>
    </div>
  );
};

const NoteCard = ({ title, content }) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-5 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-2 mb-2">
        <FaStickyNote className="text-xl" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm line-clamp-3">{content}</p>
    </div>
  );
};

export default Notes;
