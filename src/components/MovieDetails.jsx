import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import StarRating from "./StarRating";
import { useKey } from "../useKey";

const MovieDetails = ({
  movieId,
  onMovieClose,
  onAddMovieToWatchList,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((m) => m.imdbID).includes(movieId);
  const watchedRating = watched.find(
    (movie) => movie.imdbID === movieId,
  )?.userRating;

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

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: movieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddMovieToWatchList(newWatchedMovie);
    onMovieClose();
  };

  useEffect(
    function() {
      async function getMovieDetails() {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://www.omdbapi.com/?i=${movieId}&apikey=4857fbf0`,
          );
          const data = await response.json();
          setMovie(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [movieId],
  );

  useEffect(
    function() {
      if (title) document.title = title;
      return () => {
        document.title = "use popcorn";
      };
    },
    [title],
  );
  useKey("Escape", onMovieClose);

  if (isLoading) {
    return <p className="loader">Loading</p>;
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
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 1 && (
                <button className="btn-add" onClick={handleAdd}>
                  +Add To List
                </button>
              )}
            </>
          ) : (
            <p>You rated this movie {watchedRating} ⭐</p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Staring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
};

MovieDetails.propTypes = {
  movieId: PropTypes.string,
  onMovieClose: PropTypes.func,
  onAddMovieToWatchList: PropTypes.func,
  watched: PropTypes.array,
};
export default MovieDetails;
