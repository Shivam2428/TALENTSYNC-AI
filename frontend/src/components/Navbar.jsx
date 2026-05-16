import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>TalentSync AI</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/candidates">Candidates</Link>
        <Link to="/shortlist">Shortlist</Link>
      </div>
    </nav>
  );
}

export default Navbar;