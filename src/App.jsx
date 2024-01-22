import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Box from "./components/Box";
import SearchQuery from "./components/SearchQuery";
import NumResults from "./components/NumResults";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import MovieDetails from "./components/MovieDetails";
import WatchedList from "./components/WatchedList";
import Err from "./components/Err";
import { useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => loadWatchedFromLocalStorage());
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("Interstellar");
  const apiKey = "4857fbf0";

  const onSelectMovieId = (movieId) => {
    movieId === selectedMovieId
      ? setSelectedMovieId(null)
      : setSelectedMovieId(movieId);
  };

  const onMovieClose = () => {
    setSelectedMovieId(null);
  };

  function onAddMovieToWatchList(movie) {
    setWatched([...watched, movie]);
  }

  function loadWatchedFromLocalStorage() {
    const wacthedFromLocalStorage = localStorage.getItem("watched");
    if (!wacthedFromLocalStorage) {
      return [];
    }
    return JSON.parse(wacthedFromLocalStorage);
  }

  function onDeleteMovieFromWatchList(movie) {
    const newWatched = watched.filter((w) => w.imdbID !== movie.imdbID);
    setWatched(newWatched);
  }

  useEffect(
    function() {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched],
  );

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`,
          { signal: controller.signal },
        );
        if (!res.ok)
          throw new Error("Some error occured. Try again some time later");
        const data = await res.json();
        if (data.Response === "False") throw new Error("No movies found");
        setMovies(data.Search);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }
    fetchMovies();
    return function() {
      controller.abort();
    };
  }, [query]);
  return (
    <>
      <Nav>
        <Logo />
        <SearchQuery query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <Main>
        <Box>
          {isLoading && <div className="loader">Loading... </div>}
          {error && <Err message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovieId={onSelectMovieId} />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              movieId={selectedMovieId}
              onMovieClose={onMovieClose}
              onAddMovieToWatchList={onAddMovieToWatchList}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteMovieFromWatchList={onDeleteMovieFromWatchList}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
