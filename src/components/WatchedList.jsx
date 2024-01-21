import PropTypes from "prop-types";
import WatchedMovie from "./WatchedMovie";
const WatchedList = ({ watched, onDeleteMovieFromWatchList }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteMovieFromWatchList={onDeleteMovieFromWatchList}
        />
      ))}
    </ul>
  );
};

WatchedList.propTypes = {
  watched: PropTypes.array,
};

export default WatchedList;
