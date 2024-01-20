import PropTypes from "prop-types";
export const SearchQuery = ({ query, setQuery }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

SearchQuery.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};
export default SearchQuery;
