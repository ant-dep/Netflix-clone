import React, { useState, useEffect } from "react";
import axios from "../../axios";
import requests from "../../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ] /* set a random index to display one of the movie randomly each time */
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
      )`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
          {/* replace an if/else statement checking if there a "title" or a "name" or an "original_name" with optional chaining */}
        </h1>
        <div class="banner__buttons">
          <button class="banner__button">Play</button>
          <button class="banner__button">My List</button>
        </div>
        {/* Calls the truncate method after 200 words */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 200)}
        </h1>
      </div>
      <div class="banner--fadeBottom">
        {/* used to make a fade effect from banner to rows */}
      </div>
    </header>
  );
}

export default Banner;
