import PropTypes from "prop-types";
const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};
NumResults.propTypes = {
  movies: PropTypes.array.isRequired,
};
export default NumResults;
