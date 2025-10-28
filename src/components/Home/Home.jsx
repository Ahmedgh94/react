import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../Movielist/MovieCard";
import Slider from "../Slider/Slider";
import "./home.css";

import slide1 from "../../assets/slides/conjuring3slide.png";
import slide2 from "../../assets/slides/inception.jpg";
import slide3 from "../../assets/slides/thegodfather.jpg";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/movies")
      .then((res) => {
        console.log("API respons movies:", res.data);
        setMovies(Array.isArray(res.data.movies) ? res.data.movies : []);
      })
      .catch((err) => console.error("Fout bij het ophalen van films:", err));
  }, []);

  // 🎞️ Je eigen slides
  const slides = [
    { image: slide1, title: "Welkom bij Rotten Clones", text: "Ontdek trending films en echte reviews." },
    { image: slide2, title: "In de bioscoop", text: "Bekijk de nieuwste kassuccessen." },
    { image: slide3, title: "Critics' Picks", text: "De best beoordeelde films van deze maand." },
  ];

  return (
    <div className="home">
      <Slider slides={slides} />
      <section className="movies-section">
        <div className="section-header">
          <h2>Nu te zien</h2>
        </div>
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>Films laden...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
