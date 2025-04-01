import React from "react";

const UploadVideos = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Manage Videos</h1>
        <p className="text-gray-600 mt-2">
          Upload, view, and manage videos for your courses.
        </p>
      </header> 

      {/* Video List Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Video Card */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Video Thumbnail</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">Video Title</h3>
              <p className="text-gray-600 mt-2 text-sm">
                A brief description of the video goes here.
              </p>
              <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                Watch Video
              </button>
            </div>
          </div>
          {/* Add more video cards dynamically */}
        </div>
      </section>

      {/* Upload Video Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload a New Video</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <form>
            <label className="block text-gray-700 font-medium mb-2">
              Select a video to upload:
            </label>
            <input
              type="file"
              accept="video/*"
              name="videoFile"
              className="block w-full mb-4 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              accept="video/*"
              name="videoFile"
              className="block w-full mb-4 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> 
            <input
              type="file"
              accept="image/*"
              name="thumbnail"
              className="block w-full mb-4 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="py-2 px-6 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Upload Video
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UploadVideos;