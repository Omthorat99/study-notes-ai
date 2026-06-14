import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

function ShortNotes() {
  const [shortNote, setShortNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [shortNotes, setShortNotes] = useState(() => {
    const savedNotes = localStorage.getItem("shortNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "shortNotes",
      JSON.stringify(shortNotes)
    );
  }, [shortNotes]);

  const addShortNote = () => {
    if (!shortNote.trim()) return;

    const newNote = {
      id: Date.now(),
      text: shortNote,
    };

    setShortNotes([...shortNotes, newNote]);
    setShortNote("");
  };

  const deleteShortNote = (id) => {
    setShortNotes(
      shortNotes.filter((note) => note.id !== id)
    );
  };

  const filteredNotes = shortNotes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Short Notes
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <input
          type="text"
          placeholder="Enter Short Note"
          value={shortNote}
          onChange={(e) => setShortNote(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={addShortNote}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Short Note
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Short Notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6"
      />

      <div className="space-y-3">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
          >
            <span>{note.text}</span>

            <button
              onClick={() => deleteShortNote(note.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default ShortNotes;