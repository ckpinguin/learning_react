import { useState, useEffect } from "react"

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    try {
      // console.log("Stored value:", storedValue)
      return storedValue ? JSON.parse(storedValue) : initialState
    } catch (error) {
      console.error("Error parsing stored value:", error)
      return initialState
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Error storing value in localStorage:", error)
    }
  }, [value, key])

  return [value, setValue]
}
