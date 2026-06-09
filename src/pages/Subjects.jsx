import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

function Subjects() {
  const [subject, setSubject] = useState("");

  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem("subjects");
    return savedSubjects ? JSON.parse(savedSubjects) : [];
  });

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!subject.trim()) return;

    setSubjects([...subjects, subject]);
    setSubject("");
  };

  const deleteSubject = (indexToDelete) => {
    setSubjects(
      subjects.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <MainLayout>
      <h1>Subjects</h1>

      <input
        type="text"
        placeholder="Enter Subject Name"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <button onClick={addSubject} style={{ marginLeft: "10px" }}>
        Add Subject
      </button>

      <hr />

      {subjects.length === 0 ? (
        <p>No subjects added yet.</p>
      ) : (
        subjects.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <span>{item}</span>

            <button
              onClick={() => deleteSubject(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </MainLayout>
  );
}

export default Subjects;