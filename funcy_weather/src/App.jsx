import { useEffect, React } from "react"
import { useWeather } from "./useWeather"
import { useLocalStorageState } from "./useLocalStorageState"

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ])
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode))
  if (!arr) return "NOT FOUND"
  return icons.get(arr)
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr))
}

export default function App() {
  const [location, setLocation] = useLocalStorageState("Rüti", "location")
  const { weather, displayLocation, isLoading, error } = useWeather(location)

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <div>
        <Input
          location={location}
          onChangeLocation={(e) => setLocation(e.target.value)}
        />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.toString()}</p>}

      {weather.weathercode && (
        <Weather weather={weather} location={displayLocation} />
      )}
    </div>
  )
}

function Input({ location, onChangeLocation }) {
  return (
    <input
      type="text"
      placeholder="Search for location..."
      value={location}
      onChange={onChangeLocation}
    />
  )
}

function Weather({ weather, location }) {
  useEffect(() => {
    return console.log("Weather component will unmount")
  }, [])

  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather

  return (
    <div>
      <h2>Weather: {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  )
}

function Day(props) {
  const { date, max, min, code, isToday } = props
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; {Math.ceil(max)}&deg;
      </p>
    </li>
  )
}
