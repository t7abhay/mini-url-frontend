/* import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { errorToast, successToast } from "../utils/notifications/Toasts";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import { axiosInstance } from "../config/axios/axiosInstance";

export default function Navbar() {
  const { user, loading, logout: authLogout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user !== null) {
      setIsLoggingOut(true);
      axiosInstance
        .post(
          "/logout",
          {},
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setIsLoggingOut(false);
          authLogout();
          successToast(response.data.message);
          navigate("/login");
        })
        .catch((error) => {
          setIsLoggingOut(false);
          errorToast("Logout failed. Please try again.");
        });
    }
  };

  return (
    <div id="navbar">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profiles">Profile</Link>
      {user && (
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            backgroundColor: "#FF7F50",
            border: "none",
            color: "white",
            padding: "10px 32px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            justifyContent: "right",
            margin: "4px 2px",
            fontSize: "16px",
            position: "absolute",
            right: "10px",
            top: "20px",
            cursor: isLoggingOut ? "not-allowed" : "pointer", // Optional: disable pointer during logout
          }}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      )}
    </div>
  );
}
 */

import { Link } from "react-router-dom";
import "./componentsstyles/navbar.style.css";
import HomePage from "../pages/HomePage";
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
