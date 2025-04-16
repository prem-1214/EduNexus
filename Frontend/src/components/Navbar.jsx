import { FaSearch } from "react-icons/fa"
import { FiSettings } from "react-icons/fi"
import { IoMdNotificationsOutline } from "react-icons/io"
import { FaRegUserCircle } from "react-icons/fa"

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full border-b pb-4 px-6 bg-white shadow-md">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search"
          className="border p-2 pl-8 rounded w-full"
        />
        <FaSearch className="absolute left-2 top-3 text-gray-500" />
      </div>
      <div className="flex gap-4 items-center">
        <IoMdNotificationsOutline className="text-xl" />
        <FiSettings className="text-xl" />
        <FaRegUserCircle className="text-2xl" />
      </div>
    </div>
  )
}

export default Navbar
