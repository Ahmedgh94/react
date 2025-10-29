import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_url
    ? `http://localhost:8000/assets/${movie.poster_url.split('/').pop()}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  // ✂️ Omschrijving beperken tot 5 woorden
  const shortenDescription = (text) => {
    if (!text) return 'Geen beschrijving beschikbaar';
    const words = text.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : text;
  };

  return (
    <Link
      to={`/movie/${movie.id}`} // ✅ React-router link naar details
      className='movie_card'
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className='movie_poster'
      />

      <div className='movie_details'>
        <h3 className='movie_details_heading'>{movie.title}</h3>
        <div className='align_center movie_date_rate'>
          <p>{movie.year}</p>
        </div>
        <p className='movie_description'>
          {shortenDescription(movie.description || movie.overview)}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
