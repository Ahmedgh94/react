import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Movielist.css";
import Fire from "../../assets/fire.png";
import MovieCard from "./MovieCard";

const Movielist = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null); // Current logged-in user

  useEffect(() => {
    const saved = localStorage.getItem("movieapp_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await fetch("http://localhost:5000/movies");
    const data = await res.json();
    setMovies(data || []);
  };

  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Popular
          <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </h2>
      </header>

      {/* Movies list */}
      <div className="movie_cards">
        {movies.map((movie) => (
          <div key={movie.id} className="movie_card_container">
            {/* Redirect to MovieDetails page using Link */}
            <Link to={`/movie/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Movielist;
