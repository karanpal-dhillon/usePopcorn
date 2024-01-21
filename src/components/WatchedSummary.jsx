import PropTypes from "prop-types";
const WatchedSummary = ({ watched }) => {
  const average = (arr) => arr.reduce((a, b, _, arr) => a + b / arr.length, 0);

  const avgImdbRating = Number(
    average(watched.map((w) => w.imdbRating)),
  ).toFixed(1);
  const avgUserRating = Number(
    average(watched.map((w) => w.userRating)),
  ).toFixed(1);
  const avgRuntime = Number(average(watched.map((w) => w.runtime))).toFixed(1);
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
