import { Link } from "react-router-dom"
import styles from "./CityItem.module.css"
import { useCities } from "../context/CitiesContext"

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities()
  const { cityName, emoji, date, id, position } = city
  const { lat, lng } = position

  function handleClick(e) {
    e.preventDefault()
    deleteCity(id)
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lng=${lng}&lat=${lat}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  )
}
