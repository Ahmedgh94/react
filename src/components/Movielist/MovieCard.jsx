import React from 'react'
import './MovieCard.css'
import Star from '../../assets/star.png'

const MovieCard = ({movie}) => {
  return (
    <a href={`http://localhost:5000/movies/${movie.id}`}  target='_blank'
    className='movie_card'>
        <img 
        src={`https://m.media-amazon.com/images/I/91b3Xtjt0IL._UF1000,1000_QL80_.jpg`}
        alt='movie_poster' 
        className='movie_poster' 
        />

        <div className="movie_details">
          <h3 className="movie_details_heading">{movie.original_title}</h3>
          <div className="align_center movie_date_rate">
            <p>{movie.release_date}</p>
            <p>{movie.Vote_average} <img src={Star} alt="rating icon" 
            className='card-emoji'/></p>

          </div>

          <p className='movie_description'>
            {movie.overview.slice(0, 100)+ "..."}
          </p>
        </div>
    </a>

  )
}

export default MovieCard