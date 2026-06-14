import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../api/api";

function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [notes, setNotes] = useState([]);
  const [stickyNotes, setStickyNotes] = useState([]);

  useEffect(() => {
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

  const latestSubject =
    subjects.length > 0
      ? subjects[subjects.length - 1].name
      : "No Subject";

  const latestChapter =
    chapters.length > 0
      ? chapters[chapters.length - 1].title
      : "No Chapter";

  const latestNote =
    notes.length > 0
      ? notes[notes.length - 1].title
      : "No Note";

  const latestStickyNote =
    stickyNotes.length > 0
      ? stickyNotes[stickyNotes.length - 1].title
      : "No Sticky Note";

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-lg opacity-90">
            Subjects
          </h2>
          <p className="text-5xl font-bold mt-3">
            {subjects.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-lg opacity-90">
            Chapters
          </h2>
          <p className="text-5xl font-bold mt-3">
            {chapters.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-lg opacity-90">
            Notes
          </h2>
          <p className="text-5xl font-bold mt-3">
            {notes.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-lg opacity-90">
            Sticky Notes
          </h2>
          <p className="text-5xl font-bold mt-3">
            {stickyNotes.length}
          </p>
        </div>

      </div>

      {/* Recent Activity */}
      <h2 className="text-2xl font-bold text-slate-800 mb-5">
        Recent Activity
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition duration-300">
          <h3 className="font-bold text-blue-600 mb-2">
            Latest Subject
          </h3>
          <p className="text-gray-700">
            {latestSubject}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition duration-300">
          <h3 className="font-bold text-green-600 mb-2">
            Latest Chapter
          </h3>
          <p className="text-gray-700">
            {latestChapter}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition duration-300">
          <h3 className="font-bold text-purple-600 mb-2">
            Latest Note
          </h3>
          <p className="text-gray-700">
            {latestNote}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition duration-300">
          <h3 className="font-bold text-pink-600 mb-2">
            Latest Sticky Note
          </h3>
          <p className="text-gray-700">
            {latestStickyNote}
          </p>
        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;