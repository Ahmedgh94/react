import React from "react";
import "./Navbar.css";
import Fire from "../../assets/fire.png";
import Star from "../../assets/glowing-star.png";
import Party from "../../assets/partying-face.png";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLoginClick, onLogout }) => {
  return (
    <nav className="navbar">
      <h1>MovieReview</h1>

      <div className="navbar_links">
        <Link to="/">
          Home 
        </Link>
        <Link to="/Overons">
          Overons  
        </Link>

        {/* If the user is logged in, show "Logout" */}
        {user ? (
          <button className="auth-btn" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <Link to="/Login">
            <button className="auth-btn">
              Login / Register  
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
