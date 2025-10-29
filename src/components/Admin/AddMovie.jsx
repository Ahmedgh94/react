import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [form, setForm] = useState({
    title: "",
    year: "",
    genre: "",
    description: "",
    trailer_url: "",
  });
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("movieapp_user"))?.token;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/movies", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Film succesvol toegevoegd!");
      navigate("/");
    } catch (err) {
      console.error("Fout bij toevoegen film:", err);
      alert("❌ Geen rechten of fout bij toevoegen film.");
    }
  };

  return (
    <div className="add-movie-form">
      <h2>🎬 Nieuwe film toevoegen</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Titel" onChange={handleChange} required />
        <input name="year" placeholder="Jaar" onChange={handleChange} required />
        <input name="genre" placeholder="Genre" onChange={handleChange} required />
        <textarea name="description" placeholder="Beschrijving" onChange={handleChange} required />
        <input name="trailer_url" placeholder="Trailer URL (YouTube)" onChange={handleChange} />

        <button type="submit">Film toevoegen</button>
      </form>
    </div>
  );
};

export default AddMovie;
