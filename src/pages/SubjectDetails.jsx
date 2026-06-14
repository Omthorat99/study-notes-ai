import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../api/api";

function SubjectDetails() {
  const { subjectName } = useParams();

  const [chapter, setChapter] = useState("");
  const [chapters, setChapters] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const res = await API.get("/chapters");

      const filteredChapters = res.data.filter(
        (item) => item.subjectId?._id === subjectName
      );

      setChapters(filteredChapters);
    } catch (error) {
      console.log(error);
    }
  };

  const addChapter = async () => {
    if (!chapter.trim()) return;

    try {
      if (editingId) {
        await API.put(`/chapters/${editingId}`, {
          title: chapter,
        });

        setEditingId(null);
      } else {
        await API.post("/chapters", {
          title: chapter,
          subjectId: subjectName,
        });
      }

      setChapter("");
      fetchChapters();
    } catch (error) {
      console.log(error);
    }
  };

  const editChapter = (chapterData) => {
    setChapter(chapterData.title);
    setEditingId(chapterData._id);
  };

  const deleteChapter = async (id) => {
    try {
      await API.delete(`/chapters/${id}`);
      fetchChapters();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Chapters
          </h1>

          <p className="text-gray-500 mt-1">
            Organize chapters for this subject
          </p>
        </div>

        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold">
          Total: {chapters.length}
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-5">
          {editingId
            ? "Update Chapter"
            : "Create Chapter"}
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter Chapter Name"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={addChapter}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
          >
            {editingId
              ? "Update Chapter"
              : "Add Chapter"}
          </button>
        </div>
      </div>

      {chapters.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Chapters Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first chapter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {chapters.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-2xl p-5 flex justify-between items-center hover:shadow-xl transition"
            >
              <Link
                to={`/subjects/${subjectName}/${item._id}`}
                className="text-xl font-semibold text-green-600 hover:text-green-800"
              >
                {item.title}
              </Link>

              <div className="flex gap-3">
                <button
                  onClick={() => editChapter(item)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteChapter(item._id)}
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

export default SubjectDetails;