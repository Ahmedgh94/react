import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Movielist from "./components/Movielist/Movielist";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Login_signup from "./components/Login/Login_signup";
import Overons from "./components/Overpage/Overons";
import Navbar from "./components/Navbar/Navbar";
import AddMovie from "./components/Admin/AddMovie";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // ✅ Haal user + token uit localStorage bij herladen
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (e) {
        console.error("❌ Fout bij het parsen van user:", e);
      }
    }
  }, []);

  const handleAuthSuccess = (loggedUser) => {
    // ✅ Wordt aangeroepen vanuit Login_signup.jsx
    setUser(loggedUser);
    const savedToken = localStorage.getItem("token"); // al opgeslagen bij login
    setToken(savedToken);
  };

  const handleLogout = async () => {
    if (token) {
      try {
        await fetch("http://localhost:8000/api/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.warn("Logout mislukt op server:", error);
      }
    }

    // 🧹 Clear frontend data
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          {/* 🏠 Homepagina */}
          <Route path="/" element={<Home user={user} />} />

          {/* Extra optie: /home werkt ook */}
          <Route path="/home" element={<Home user={user} />} />

          {/* 🎬 Alle films */}
          <Route path="/movies" element={<Movielist />} />

          {/* 📄 Film details */}
          <Route path="/movie/:id" element={<MovieDetails user={user} token={token} />} />

          {/* 🔐 Login / Signup */}
          <Route path="/login" element={<Login_signup onAuth={handleAuthSuccess} />} />

          {/* ℹ️ Over ons */}
          <Route path="/overons" element={<Overons />} />

          {/* 🎥 Alleen admin mag AddMovie zien */}
          <Route path="/add-movie" element={user?.is_admin ? <AddMovie /> : <p>Geen toegang</p>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
