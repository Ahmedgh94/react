import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../Review/CommentList";
import CommentForm from "../Review/CommentForm";
import "./MovieDetails.css";

const MovieDetails = ({ user, openAuth }) => {
  const { id } = useParams(); // Get movie ID from URL
  const movieId = Number(id);

  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchMovie();
    fetchComments();
  }, [id]);

  const fetchMovie = async () => {
    const res = await fetch(`http://localhost:5000/movies/${movieId}`);
    const data = await res.json();
    setMovie(data);
  };

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:5000/comments?movieId=${movieId}`);
    const data = await res.json();
    setComments(data);
  };

  const addComment = async (text) => {
    if (!user) {
      openAuth(); // If no user, open auth modal
      return;
    }

    const newComment = {
      movieId,
      user: user.name || user.email,
      text,
      date: new Date().toLocaleDateString(),
    };

    const res = await fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });
    const saved = await res.json();
    setComments((prev) => [...prev, saved]);
  };

  if (!movie) return <section className="movie_details_page">Loading...</section>;

  return (
    <section className="movie_details_page">
      <div className="details_header">
        <Link to="/" className="back_link">← Back</Link>
        <h2 className="title">{movie.title}</h2>
      </div>

      <div className="details_body">
        <img className="poster_large" src={movie.poster_path} alt={movie.title} />
        <div className="meta">
          <p><strong>Release:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>

      <div className="comments_section">
        <h3>Comments</h3>
        {user ? (
          <CommentForm addComment={addComment} />
        ) : (
          <p className="login-hint">
            ⚠️ If you want add a comment, Must {" "}
            <button className="linklike" onClick={openAuth}>Login</button>.
          </p>
        )}
        <CommentList comments={comments} />
      </div>
    </section>
  );
};

export default MovieDetails;
