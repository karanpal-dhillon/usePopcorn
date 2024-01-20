import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
const MovieDetails = ({ movieId, onMovieClose }) => {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function() {
      async function getMovieDetails() {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${movieId}&apikey=4857fbf0`,
        );
        const data = await response.json();
        setMovie(data);
      }
      getMovieDetails();
    },
    [movieId],
  );
  return (
    <div>
      <button className="btn-back">&larr;</button>
      <img src={poster} alt={`Poster of ${title}`} />
    </div>
  );
};

MovieDetails.propTypes = {
  movieId: PropTypes.string,
  onMovieClose: PropTypes.func,
};
export default MovieDetails;
