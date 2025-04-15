import { useState } from "react";
import { FaSearch, FaDownload, FaFileAlt } from "react-icons/fa";

const initialDownloads = [
  {
    id: 1,
    title: "C++ Complete Guide",
    url: "/downloads/cpp-guide.pdf",
    size: "2.4MB",
  },
  {
    id: 2,
    title: "Operating System Notes",
    url: "/downloads/os-notes.pdf",
    size: "1.1MB",
  },
  {
    id: 3,
    title: "DSA Cheat Sheet",
    url: "/downloads/dsa-cheatsheet.pdf",
    size: "650KB",
  },
];

const Downloads = () => {
  const [search, setSearch] = useState("");

  const filteredDownloads = initialDownloads.filter((file) =>
    file.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📁 Downloads</h1>

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search downloads..."
          className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDownloads.length > 0 ? (
          filteredDownloads.map((file) => <DownloadCard key={file.id} {...file} />)
        ) : (
          <p className="text-gray-500 col-span-full">No files found.</p>
        )}
      </div>
    </div>
  );
};

const DownloadCard = ({ title, url, size }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="flex items-center gap-3 mb-3">
        <FaFileAlt className="text-xl" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span>{size}</span>
        <a
          href={url}
          download
          className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition"
        >
          <FaDownload /> Download
        </a>
      </div>
    </div>
  );
};

export default Downloads;
