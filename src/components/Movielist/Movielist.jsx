import React from "react";
import "./Movielist.css";
import Fire from "../../assets/fire.png";
import MovieCard from "./MovieCard";

const Movielist = () => {
  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          Popular
          <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li className="movie_filter_item active">8+ Stars</li>
            <li className="movie_filter_item">7+ Stars</li>
            <li className="movie_filter_item">6+ Stars</li>
          </ul>

          <select name="" id="" className="movie_sorting">
            <option value="">SortBy</option>
            <option value="">Date</option>
            <option value="">Rating</option>
          </select>
          <select name="" id="" className="movie_sorting">
            <option value="">Ascending</option>
            <option value="">Descendig</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        <MovieCard />
      </div>
    </section>
  );
};

export default Movielist;
