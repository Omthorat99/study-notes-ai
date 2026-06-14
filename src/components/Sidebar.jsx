import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const navItem =
    "px-4 py-3 rounded-lg transition duration-200";

  const active =
    "bg-blue-600 text-white";

  const normal =
    "text-gray-300 hover:bg-slate-800 hover:text-white";

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6 shadow-xl">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Study Notes AI
      </h1>

      <nav className="flex flex-col gap-3">

        <Link
          to="/"
          className={`${navItem} ${
            location.pathname === "/"
              ? active
              : normal
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/subjects"
          className={`${navItem} ${
            location.pathname === "/subjects"
              ? active
              : normal
          }`}
        >
          Subjects
        </Link>

        <Link
          to="/short-notes"
          className={`${navItem} ${
            location.pathname === "/short-notes"
              ? active
              : normal
          }`}
        >
          Short Notes
        </Link>

        <Link
          to="/chapters"
          className={`${navItem} ${
            location.pathname === "/chapters"
              ? active
              : normal
          }`}
        >
          Chapters
        </Link>

        <Link
          to="/notes"
          className={`${navItem} ${
            location.pathname === "/notes"
              ? active
              : normal
          }`}
        >
          Notes
        </Link>

        <Link
          to="/sticky-notes"
          className={`${navItem} ${
            location.pathname === "/sticky-notes"
              ? active
              : normal
          }`}
        >
          Sticky Notes
        </Link>

        <Link
          to="/profile"
          className={`${navItem} ${
            location.pathname === "/profile"
              ? active
              : normal
          }`}
        >
          Profile
        </Link>

      </nav>

      <div className="mt-auto pt-10 text-center text-gray-400 text-sm">
        Study Notes AI v1.0
      </div>
    </div>
  );
}

export default Sidebar;