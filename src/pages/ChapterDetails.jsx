import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../api/api";

function ChapterDetails() {
  const { chapterId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");

      const filteredNotes = res.data.filter(
        (note) => note.chapterId?._id === chapterId
      );

      setNotes(filteredNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      if (editingId) {
        await API.put(`/notes/${editingId}`, {
          title,
          content,
        });

        setEditingId(null);
      } else {
        await API.post("/notes", {
          title,
          content,
          chapterId,
        });
      }

      setTitle("");
      setContent("");

      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Notes
          </h1>

          <p className="text-gray-500 mt-1">
            Manage notes for this chapter
          </p>
        </div>

        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-semibold">
          Total: {filteredNotes.length}
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-5">
          {editingId
            ? "Edit Note"
            : "Create Note"}
        </h2>

        <input
          type="text"
          placeholder="Enter Note Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <textarea
          placeholder="Enter Note Content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          rows="5"
          className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={addNote}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"
        >
          {editingId
            ? "Update Note"
            : "Add Note"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Notes..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="w-full border border-gray-300 rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      {filteredNotes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Notes Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first note for this chapter.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                {note.title}
              </h3>

              <p className="text-gray-700 whitespace-pre-wrap mb-5">
                {note.content}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    editNote(note)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteNote(note._id)
                  }
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

export default ChapterDetails;