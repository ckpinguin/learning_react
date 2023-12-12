import { useState, useEffect } from "react"

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

export function useWeather(location, callback) {
  const [weather, setWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  // displayLocation has more to do with presentation, so
  // ideally this belongs to the user component, but I'll
  // leave it here for this example
  const [displayLocation, setDisplayLocation] = useState()

  useEffect(() => {
    callback?.()

    const controller = new AbortController()

    async function fetchWeather() {
      if (location.length < 2) return setWeather({})

      try {
        setIsLoading(true)

        // 1) Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
        )
        const geoData = await geoRes.json()
        // console.log(geoData)

        if (!geoData.results) throw new Error("Location not found")

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0)
        setDisplayLocation(`${name} ${convertToFlag(country_code)}`)

        // 2) Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
        )
        const weatherData = await weatherRes.json()
        setWeather(weatherData.daily)
      } catch (err) {
        //console.error(err)
        setError(err)
      } finally {
        setIsLoading(false)
        setError(null)
      }
    }

    fetchWeather()

    return () => {
      controller.abort()
    }
  }, [callback, location])
  return { weather, displayLocation, isLoading, error }
}
