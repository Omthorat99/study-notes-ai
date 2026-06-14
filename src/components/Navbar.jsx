function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="bg-white border-b px-8 py-4 shadow-sm flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome, {user?.name || "User"} 👋
        </h2>

        <p className="text-gray-500 text-sm">
          Manage your study materials efficiently
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="hidden md:flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;