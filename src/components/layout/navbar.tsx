import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-pink-500">
        🌸 HerHealth
      </h1>

      <div className="flex gap-6 text-gray-600 font-medium">

        <Link
          to="/dashboard"
          className="hover:text-pink-500 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/add-entry"
          className="hover:text-pink-500 transition"
        >
          Add Entry
        </Link>

        <Link
          to="/history"
          className="hover:text-pink-500 transition"
        >
          History
        </Link>

        <Link
          to="/profile"
          className="hover:text-pink-500 transition"
        >
          Profile
        </Link>

      </div>
    </nav>
  );
}