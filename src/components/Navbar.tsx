import { Link } from "react-router-dom";
import "./componentsstyles/navbar.styles.css";

export default function Navbar() {
  return (
    <nav>
      <div className="navbar">
        <ul className="nav-links">
          <Link to="/" className="hover:text-orange-400 font-medium">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-orange-400 font-medium">
            Dashboard
          </Link>
          <Link to="/profiles" className="hover:text-orange-400 font-medium">
            Profile
          </Link>
        </ul>
      </div>
    </nav>
  );
}
