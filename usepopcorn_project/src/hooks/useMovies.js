import { useState, useEffect } from "react"

export const KEY = "6dc47234"

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    callback?.()

    const controller = new AbortController()

    async function fetchMovies() {
      setIsLoading(true)
      setError("")
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal },
        )
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies")
        const data = await res.json()
        if (data.Response === "False") {
          throw new Error(`No movies "${query}" found`)
        }
        setMovies(data.Search)
        // console.log(data.Search)
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message)
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      return
    }
    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [query])

  return { movies, isLoading, error }
}
