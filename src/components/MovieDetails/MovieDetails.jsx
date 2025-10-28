import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Star from "../../assets/star.png";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error("Fout bij het ophalen van de film:", err);
      setError("Kon de film niet laden.");
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/movies/reviews/${id}`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      console.error("Fout bij het ophalen van reviews:", err);
      setError("Kon de reviews niet laden.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchMovie(), fetchReviews()]);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Laden...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Geen film gevonden</p>;

  const posterUrl = movie.poster_url
    ? `http://localhost:8000/assets/${movie.poster_url.split("/").pop()}`
    : "https://via.placeholder.com/300x450?text=Geen+afbeelding";

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url;
  };

  const trailerEmbed = getEmbedUrl(movie.trailer_url);

  return (
    <div className="movie_details_page">
      {/* 🔙 Terugknop + titel */}
      <div className="details_header">
        <Link to="/" className="back_link">
          ← Terug
        </Link>
        <h1 className="title">{movie.title}</h1>
      </div>

      {/* 🖼️ Film details */}
      <div className="details_body">
        <img src={posterUrl} alt={movie.title} className="poster_large" />
        <div className="meta">
          <p><strong>Jaar:</strong> {movie.year || "N/A"}</p>
          <p><strong>Genre:</strong> {movie.genre || "Onbekend"}</p>
          <p className="overview">{movie.description || "Geen beschrijving beschikbaar."}</p>
        </div>
      </div>

      {/* 🎬 Trailer sectie */}
      {trailerEmbed && (
        <div className="movie-trailer">
          <h2>Trailer</h2>
          <div className="trailer-container">
            <iframe
              src={trailerEmbed}
              title={`${movie.title} trailer`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* 💬 Reviews */}
      <div className="comments_section">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>Geen reviews beschikbaar.</p>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <h3>{review.title}</h3>
                <p>{review.body}</p>
                <div className="review-rating">
                  <img src={Star} alt="ster" className="star-icon" />
                  <span>{review.rating}/10</span>
                </div>
                <p><strong>Door:</strong> {review.user?.name || "Anoniem"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
