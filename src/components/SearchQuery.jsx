import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";
export const SearchQuery = ({ query, setQuery }) => {
  const inputEl = useRef(null);
  useEffect(
    function() {
      function callback(e) {
        if (document.activeElement === inputEl) return;
        if (e.code.toLowerCase() === "enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);
      return function() {
        document.removeEventListener("keydown", callback);
      };
    },
    [setQuery],
  );

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
