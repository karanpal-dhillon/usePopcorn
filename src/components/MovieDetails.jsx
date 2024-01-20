import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import StarRating from "./StarRating";

const MovieDetails = ({ movieId, onMovieClose }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false)

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
    function () {
      async function getMovieDetails() {
        setIsLoading(true)
        try{

        const response = await fetch(
          `https://www.omdbapi.com/?i=${movieId}&apikey=4857fbf0`,
        );
        const data = await response.json();
        setMovie(data);
        }
        catch(err) {
          console.error(err)
        }
        finally {
          setIsLoading(false)
        }
      }
      getMovieDetails();
    },
    [movieId],
  );
  if(isLoading){
    return <p className="loader">Loading</p>
  }
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onMovieClose}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDB Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Staring {actors}</p>
        <p>
          Directed by {director}
        </p>
      </section>
    </div>
  );
};

MovieDetails.propTypes = {
  movieId: PropTypes.string,
  onMovieClose: PropTypes.func,
};
export default MovieDetails;
