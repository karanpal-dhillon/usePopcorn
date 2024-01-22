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
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";

function App() {
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [query, setQuery] = useState("Interstellar");
  const { movies, isLoading, error } = useMovies(query);

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

  function onDeleteMovieFromWatchList(movie) {
    const newWatched = watched.filter((w) => w.imdbID !== movie.imdbID);
    setWatched(newWatched);
  }

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
