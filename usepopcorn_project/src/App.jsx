import { useState } from "react"
import MovieDetails from "./components/MovieDetails"
import WatchedSummary from "./components/WatchedSummary"
import WatchedMoviesList from "./components/WatchedMoviesList"
import MovieList from "./components/MovieList"
import {
  Box,
  NumResults,
  Main,
  NavBar,
  ErrorMessage,
  Loader,
} from "./components/Helpers"
import { Search } from "./components/Search"
import { useMovies } from "./hooks/useMovies"
import { useLocalStorageState } from "./hooks/useLocalStorageState"

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

export default function App() {
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie)
  const [watched, setWatched] = useLocalStorageState([], "watched")

  /*   useEffect(() => {
    console.log("After initial render (mount)")
  }, [])
  useEffect(() => {
    console.log("After every render")
  })
  console.log("During render")
  useEffect(() => {
    console.log("After render because of change in movies state")
  }, [query]) */

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched([...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id))
  }

  /*   useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQuery(input)
    }, 500)

    // Cleanup the timeout if the input changes before the delay
    return () => clearTimeout(delayDebounceFn)
  }, [input]) */

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId && query ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}
