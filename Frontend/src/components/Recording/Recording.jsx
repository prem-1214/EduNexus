import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const recordings = [
  { title: "Color Styles - 02", category: "Color Styles", duration: "1:30hr", lessons: 12 },
  { title: "Design Thinking", category: "Curiosity for Terminology", duration: "2:30hr", lessons: 18 },
  { title: "Visual Design Briefs", category: "Curiosity for Terminology", duration: "3:50hr", lessons: 31 },
  { title: "Curiosity for Terminology", category: "Curiosity for Terminology", duration: "4:00hr", lessons: 22 },
  { title: "Color Styles - 01", category: "Color Styles", duration: "2:30hr", lessons: 12 },
];

const ClassRecordings = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-6 pl-20 md:pl-64 overflow-y-auto overflow-x-hidden">
        <Navbar />
        <h1 className="text-2xl font-bold mt-4">Class Recordings</h1>
        <p className="text-gray-600">Access and review past class sessions</p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {recordings.map((rec, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <div className="text-lg font-bold">{rec.category}</div>
              <p className="text-gray-600">{rec.title}</p>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{rec.duration}</span>
                <span>{rec.lessons} Lessons</span>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">Watch Now</button>
                <button className="px-3 py-1 border rounded">Download</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            Show
            <select className="border mx-2 p-1 rounded">
              <option>2</option>
              <option>5</option>
              <option>10</option>
            </select>
            Rows
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded">Prev</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRecordings;