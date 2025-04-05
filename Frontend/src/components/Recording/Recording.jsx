import { useState } from "react";
import { FaSearch } from "react-icons/fa";

// Dummy recordings data
const recordingsData = [
  {
    id: 1,
    title: "React Props and State – Lecture 5",
    date: "2025-04-02",
    course: "React",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "MongoDB Basics – Session 3",
    date: "2025-03-30",
    course: "MongoDB",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Tailwind Design Patterns",
    date: "2025-03-25",
    course: "Tailwind",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

const ITEMS_PER_PAGE = 2;

const Recordings = () => {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = recordingsData.filter((rec) => {
    const matchesCourse = courseFilter === "All" || rec.course === courseFilter;
    const matchesSearch = rec.title.toLowerCase().includes(search.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6">🎥 Class Recordings</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search recordings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <select
          className="w-full md:w-1/3 p-2 rounded-md border shadow-sm"
          value={courseFilter}
          onChange={(e) => {
            setCourseFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Courses</option>
          <option value="React">React</option>
          <option value="MongoDB">MongoDB</option>
          <option value="Tailwind">Tailwind</option>
        </select>
      </div>

      {/* Recordings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {paginatedData.length > 0 ? (
          paginatedData.map((rec) => <RecordingCard key={rec.id} {...rec} />)
        ) : (
          <p className="text-gray-500 col-span-full">No recordings found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const RecordingCard = ({ title, date, videoUrl }) => (
  <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all border-t-4 border-blue-500">
    <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
    <p className="text-sm text-gray-500 mb-3">Recorded on: {date}</p>
    <video controls className="w-full rounded-md mb-3">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <a
      href={videoUrl}
      download
      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
    >
      Download
    </a>
  </div>
);

export default Recordings;
