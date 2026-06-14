import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../api/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [notes, setNotes] = useState([]);
  const [stickyNotes, setStickyNotes] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(loggedInUser);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const subjectsRes = await API.get("/subjects");
      const chaptersRes = await API.get("/chapters");
      const notesRes = await API.get("/notes");
      const stickyRes = await API.get("/sticky-notes");

      setSubjects(subjectsRes.data);
      setChapters(chaptersRes.data);
      setNotes(notesRes.data);
      setStickyNotes(stickyRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Profile
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your account and activity
          </p>
        </div>
      </div>

      {/* User Card */}

      <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
        <div className="flex items-center gap-6">

          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {user?.name || "User"}
            </h2>

            <p className="text-gray-600">
              {user?.email || "No Email"}
            </p>
          </div>

        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg">
            Subjects
          </h2>

          <p className="text-5xl font-bold mt-3">
            {subjects.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg">
            Chapters
          </h2>

          <p className="text-5xl font-bold mt-3">
            {chapters.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg">
            Notes
          </h2>

          <p className="text-5xl font-bold mt-3">
            {notes.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg">
            Sticky Notes
          </h2>

          <p className="text-5xl font-bold mt-3">
            {stickyNotes.length}
          </p>
        </div>

      </div>

      {/* Account Actions */}

      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Account Actions
        </h2>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </MainLayout>
  );
}

export default Profile;