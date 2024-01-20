import PropTypes from "prop-types";
import Movie from "./Movie";

const MovieList = ({ movies, onSelectMovieId }) => {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie
          key={movie.imdbID}
          {...movie}
          onSelectMovieId={onSelectMovieId}
        />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  onSelectMovieId: PropTypes.func,
};
export default MovieList;
