import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Chapters from "./pages/Chapters";
import Notes from "./pages/Notes";
import StickyNotes from "./pages/StickyNotes";
import Profile from "./pages/Profile";
import SubjectDetails from "./pages/SubjectDetails";
import ChapterDetails from "./pages/ChapterDetails";
import ShortNotes from "./pages/ShortNotes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subjects/:subjectName"
          element={
            <ProtectedRoute>
              <SubjectDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subjects/:subjectName/:chapterId"
          element={
            <ProtectedRoute>
              <ChapterDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chapters"
          element={
            <ProtectedRoute>
              <Chapters />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sticky-notes"
          element={
            <ProtectedRoute>
              <StickyNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/short-notes"
          element={
            <ProtectedRoute>
              <ShortNotes />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;