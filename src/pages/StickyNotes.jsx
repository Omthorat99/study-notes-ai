import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import API from "../api/api";

function StickyNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("yellow");
  const [stickyNotes, setStickyNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStickyNotes();
  }, []);

  const fetchStickyNotes = async () => {
    try {
      const res = await API.get("/sticky-notes");
      setStickyNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addOrUpdateStickyNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      if (editingId) {
        await API.put(`/sticky-notes/${editingId}`, {
          title,
          content,
          color,
        });
      } else {
        await API.post("/sticky-notes", {
          title,
          content,
          color,
        });
      }

      setTitle("");
      setContent("");
      setColor("yellow");
      setEditingId(null);

      fetchStickyNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const editStickyNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setColor(note.color);
    setEditingId(note._id);
  };

  const deleteStickyNote = async (id) => {
    try {
      await API.delete(`/sticky-notes/${id}`);
      fetchStickyNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const getColorClass = (color) => {
    switch (color) {
      case "green":
        return "bg-green-200";
      case "blue":
        return "bg-blue-200";
      case "pink":
        return "bg-pink-200";
      default:
        return "bg-yellow-200";
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Sticky Notes
          </h1>
          <p className="text-gray-500 mt-1">
            Capture quick ideas and reminders
          </p>
        </div>

        <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl font-semibold">
          Total: {stickyNotes.length}
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-5">
          {editingId
            ? "Edit Sticky Note"
            : "Create Sticky Note"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3"
          >
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="pink">Pink</option>
          </select>

          <button
            onClick={addOrUpdateStickyNote}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            {editingId
              ? "Update Sticky Note"
              : "Add Sticky Note"}
          </button>
        </div>
      </div>

      {stickyNotes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Sticky Notes Yet
          </h2>
          <p className="text-gray-500 mt-2">
            Create your first sticky note.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stickyNotes.map((note) => (
            <div
              key={note._id}
              className={`${getColorClass(
                note.color
              )} rounded-2xl shadow-lg p-5 hover:scale-105 transition duration-300`}
            >
              <h3 className="text-xl font-bold mb-3">
                {note.title}
              </h3>

              <p className="mb-5 whitespace-pre-wrap">
                {note.content}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => editStickyNote(note)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteStickyNote(note._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}

export default StickyNotes;