import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_url
    ? `http://localhost:8000/assets/${movie.poster_url.split('/').pop()}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

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
          {movie.description || (movie.overview ? movie.overview.slice(0, 100) + '...' : 'No description available')}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
