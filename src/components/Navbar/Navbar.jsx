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
          Home <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </Link>
        <Link to="/Overons">
          Overons <img src={Star} alt="star emoji" className="navbar_emoji" />
        </Link>

        {/* If the user is logged in, show "Logout" */}
        {user ? (
          <button className="auth-btn" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <Link to="/Login">
            <button className="auth-btn">
              Login / Register <img src={Party} alt="party emoji" className="navbar_emoji" />
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
