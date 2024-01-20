import PropTypes from "prop-types";
const Movie = ({ imdbID, Title, Year, Poster, onSelectMovieId }) => {
  return (
    <li key={imdbID} onClick={() => onSelectMovieId(imdbID)}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
};

Movie.propTypes = {
  imdbID: PropTypes.string,
  Title: PropTypes.string.isRequired,
  Year: PropTypes.string.isRequired,
  Poster: PropTypes.string.isRequired,
  onSelectMovieId: PropTypes.func,
};
export default Movie;
