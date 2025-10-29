import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <h1 className="logo">MovieReview</h1>

      <div className="navbar_links">
        <Link to="/">Home</Link>
        <Link to="/overons">Over ons</Link>

        {/* 🔐 Alleen admin ziet "Film toevoegen" */}
        {user?.is_admin && (
          <Link to="/add-movie" className="add-movie-link">
            ➕ Film toevoegen
          </Link>
        )}

        {user ? (
          <button className="auth-btn" onClick={onLogout}>
            Logout ({user.name})
          </button>
        ) : (
          <Link to="/login">
            <button className="auth-btn">Login / Register</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
