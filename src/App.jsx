import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Movielist from "./components/Movielist/Movielist";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Login_signup from "./components/Login/Login_signup";
import Overons from "./components/Overpage/Overons";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("movieapp_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleAuthSuccess = (loggedUser) => {
    setUser(loggedUser);
    localStorage.setItem("movieapp_user", JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("movieapp_user");
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          {/* ✅ Home is nu de hoofdpagina */}
          <Route path="/" element={<Home />} />

          {/* Movie lijst (optioneel op /movies) */}
          <Route path="/movies" element={<Movielist />} />

          <Route path="/movie/:id" element={<MovieDetails user={user} />} />
          <Route path="/login" element={<Login_signup onAuth={handleAuthSuccess} />} />
          <Route path="/overons" element={<Overons />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
