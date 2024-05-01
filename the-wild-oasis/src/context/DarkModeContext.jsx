import { createContext, useContext, useEffect } from "react"
import { useLocalStorageState } from "../hooks/useLocalStorageState"

const DarkModeContext = createContext()

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState("isDarkMode", false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode")
      document.documentElement.classList.add("dark-mode")
    } else {
      document.documentElement.classList.remove("dark-mode")
      document.documentElement.classList.add("light-mode")
    }
  }, [isDarkMode])

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark)
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider")
  }
  return context
}

export { DarkModeProvider, useDarkMode }