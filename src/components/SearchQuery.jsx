import PropTypes from "prop-types";
import { useRef } from "react";
import { useKey } from "../useKey";
export const SearchQuery = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

SearchQuery.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};
export default SearchQuery;
