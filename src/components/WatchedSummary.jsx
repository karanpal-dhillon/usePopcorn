import PropTypes from "prop-types";
const WatchedSummary = ({ watched }) => {
  const average = (arr) => arr.reduce((a, b, i, arr) => a + b / arr.length, 0);

  const avgImdbRating = average(watched.map((w) => w.imdbRating));
  const avgUserRating = average(watched.map((w) => w.userRating));
  const avgRuntime = average(watched.map((w) => w.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

WatchedSummary.propTypes = {
  watched: PropTypes.array,
};

export default WatchedSummary;
