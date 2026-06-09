import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Chapters from "./pages/Chapters";
import Notes from "./pages/Notes";
import StickyNotes from "./pages/StickyNotes";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/sticky-notes" element={<StickyNotes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;