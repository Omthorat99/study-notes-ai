import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{ width: "220px", padding: "20px" }}>
      <h2>Study Notes AI</h2>

      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/subjects">Subjects</Link></li>
        <li><Link to="/chapters">Chapters</Link></li>
        <li><Link to="/notes">Notes</Link></li>
        <li><Link to="/sticky-notes">Sticky Notes</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;