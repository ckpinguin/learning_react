import { createContext, useContext, useEffect, useState } from "react"

const CitiesContext = createContext()

const APIURL = "http://localhost:8000"

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${APIURL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch {
        alert("There was an error loading data...")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${APIURL}/cities/${id}`)
      const data = await res.json()
      console.log(data)
      setCurrentCity(data)
      console.log(`currentcity:`)
      console.log(currentCity.id)
    } catch {
      alert("There was an error loading data...")
    } finally {
      setIsLoading(false)
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true)
      const res = await fetch(`${APIURL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()

      setCities((cities) => [...cities, data])
    } catch {
      alert("There was an error loading data...")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined)
    throw new Error("CitiesContex was used outside the CitiesProvider")
  return context
}

export { CitiesContext, CitiesProvider, useCities }
