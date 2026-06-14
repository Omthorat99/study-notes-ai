import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../api/api";

function Subjects() {
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await API.get("/subjects");

      const userSubjects = res.data.filter(
        (item) => item.userId === user.id
      );

      setSubjects(userSubjects);
    } catch (error) {
      console.log(error);
    }
  };

  const addSubject = async () => {
    if (!subject.trim()) return;

    try {
      if (editingId) {
        await API.put(`/subjects/${editingId}`, {
          name: subject,
        });

        setEditingId(null);
      } else {
        await API.post("/subjects", {
          name: subject,
          userId: user.id,
        });
      }

      setSubject("");
      fetchSubjects();
    } catch (error) {
      console.log(error);
    }
  };

  const editSubject = (item) => {
    setSubject(item.name);
    setEditingId(item._id);
  };

  const deleteSubject = async (id) => {
    try {
      await API.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Subjects
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all your study subjects
          </p>
        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
          Total: {subjects.length}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId
            ? "Update Subject"
            : "Add New Subject"}
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={addSubject}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            {editingId
              ? "Update Subject"
              : "Add Subject"}
          </button>
        </div>
      </div>

      {subjects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Subjects Found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first subject to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {subjects.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-2xl p-5 flex justify-between items-center hover:shadow-xl transition"
            >
              <Link
                to={`/subjects/${item._id}`}
                className="text-xl font-semibold text-blue-600 hover:text-blue-800"
              >
                {item.name}
              </Link>

              <div className="flex gap-3">
                <button
                  onClick={() => editSubject(item)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteSubject(item._id)}
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

export default Subjects;