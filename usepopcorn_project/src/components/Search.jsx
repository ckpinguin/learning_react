import { useRef, useState } from "react"
import { useKey } from "../hooks/useKey"
import { useDebounce } from "../hooks/useDebounce"

export function Search({ query, setQuery }) {
  const [input, setInput] = useState("")
  // useRef has two main fields of usage:
  // 1. to access DOM elements
  // 2. to persist values between renders =>
  // (like useState, but without triggering re-rendering)
  // don't do it this way, use a ref!
  /*   useEffect(() => {
    const el = document.querySelector(".search")
    console.log(el)
    el.focus()
  }, []) */
  const inputEl = useRef(null)

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return
    // This setQuery call is not working!
    setQuery("")
    inputEl.current.focus()
  })

  const debouncedQuery = useDebounce(input, 500)
  setQuery(debouncedQuery)

  /*   useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return
      if (e.key === "Enter") {
        inputEl.current.focus()
        setQuery("")
      }
    }
    document.addEventListener("keydown", callback)
    inputEl.current.focus()
 
    return () => {
      document.addEventListener("keydown", callback)
    }
  }, [setQuery]) */
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      ref={inputEl}
    />
  )
}
