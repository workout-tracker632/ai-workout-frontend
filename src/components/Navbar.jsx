// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = () => !!localStorage.getItem("token");
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(open => !open);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        Workout<span>AI</span>
      </Link>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link
          to="/home"
          className={location.pathname === "/home" ? "active" : ""}
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          to="/Exercises"
          className={location.pathname === "/exercise" ? "active" : ""}
          onClick={closeMenu}
        >
          Exercises
        </Link>
        {authenticated && (
          <>
            <Link
              to="/video-upload"
              className={location.pathname === "/video-upload" ? "active" : ""}
              onClick={closeMenu}
            >
              Video Upload
            </Link>
            <Link
              to="/auto-classify"
              className={location.pathname === "/auto-classify" ? "active" : ""}
              onClick={closeMenu}
            >
              Auto Classify
            </Link>
            <Link
              to="/analytics"
              className={location.pathname === "/analytics" ? "active" : ""}
              onClick={closeMenu}
            >
              Analytics
            </Link>
            <Link
              to="/create-schedule"
              className={location.pathname === "/create-schedule" ? "active" : ""}
              onClick={closeMenu}
            >
              Schedule
            </Link>
          </>
        )}

        {!authenticated && (
          <>
            <Link
              to="/login"
              className={location.pathname === "/login" ? "active" : ""}
              onClick={closeMenu}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={location.pathname === "/register" ? "active" : ""}
              onClick={closeMenu}
            >
              Register
            </Link>
          </>
        )}

        {authenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>

      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
};

export default Navbar;
