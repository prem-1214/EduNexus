import { useState } from "react";
import { FaSearch, FaDownload, FaFilePdf, FaLink } from "react-icons/fa";

const resourceData = [
  {
    id: 1,
    title: "React Introduction PDF",
    type: "pdf",
    url: "/files/react-intro.pdf",
  },
  {
    id: 2,
    title: "MongoDB Notes",
    type: "pdf",
    url: "/files/mongodb-notes.pdf",
  },
  {
    id: 3,
    title: "Tailwind Docs",
    type: "link",
    url: "https://tailwindcss.com/docs",
  },
  {
    id: 4,
    title: "GitHub Guide",
    type: "link",
    url: "https://docs.github.com/en/get-started",
  },
];

const Resources = () => {
  const [search, setSearch] = useState("");

  const filteredResources = resourceData.filter((res) =>
    res.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📚 Resources</h1>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => <ResourceCard key={res.id} {...res} />)
        ) : (
          <p className="text-gray-500 col-span-full">No matching resources.</p>
        )}
      </div>
    </div>
  );
};

const ResourceCard = ({ title, type, url }) => {
  const isPDF = type === "pdf";
  const isLink = type === "link";

  return (
    <div className="bg-white border-l-4 border-indigo-500 rounded-xl shadow-md p-4 hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-3">
        {isPDF && <FaFilePdf className="text-red-600 text-xl" />}
        {isLink && <FaLink className="text-blue-600 text-xl" />}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="flex justify-end">
        {isPDF ? (
          <a
            href={url}
            download
            className="inline-flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            <FaDownload /> Download
          </a>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            <FaLink /> Visit
          </a>
        )}
      </div>
    </div>
  );
};

export default Resources;
