import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container nav-wrapper">

        <div className="logo">
          MeetPulse <span>AI</span>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {token && (
            <Link
              to="/dashboard"
              className={location.pathname === "/dashboard" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {token && (
            <Link
              to="/reports"
              className={location.pathname === "/reports" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Reports
            </Link>
          )}

          {!token && (
            <Link
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}

          {!token && (
            <Link
              to="/register"
              className={location.pathname === "/register" ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          )}

          {token && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Logout
            </a>
          )}
        </div>

        {token ? (
          <Link to="/dashboard" className="nav-btn">
            Start Analysis
          </Link>
        ) : (
          <Link to="/login" className="nav-btn">
            Login
          </Link>
        )}

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;