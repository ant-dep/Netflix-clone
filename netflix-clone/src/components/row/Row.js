import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

// Passing title as props
function Row({ title, fetchUrl, isLargeRow }) {
  // Destructuring and hooks
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [visible, setVisible] = useState(false);

  // A snippet of code which rans based on a specific condition/variable
  useEffect(() => {
    // When the row appears on the screen, makes a request to show the movies
    // if [] => run once when the row loads, and dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // "https://api.themoviedb.org/3/discover/tv?api-key=${API_KEY}&with_networks=213"
      setMovies(request.data.results);
      setVisible(true);
      return request;
    }
    fetchData();
    // Any variable pulled outsited of useEffect scope has to go inside the [] at the end of the method
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // if already open, hide the player
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name) // hanble the case if name is undefined
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); // get the params from the url from the research
          setTrailerUrl(urlParams.get("v")); // targets all after "v=" within the URL
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      {!visible ? (
        <div></div>
      ) : (
        <>
          <h2> {title} </h2>
          <div className="row__posters">
            {movies.map((movie) => (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`} // if there's isLargeRow prop, apply posterLarge instead of poster_path
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                } `}
                alt={movie.name}
              />
            ))}
          </div>
          {trailerUrl && ( // If there's a trailer available, load this component
            <YouTube
              className="video_container"
              videoId={trailerUrl}
              opts={opts}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Row;
