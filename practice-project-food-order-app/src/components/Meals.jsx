import { useState } from "react"
import { useEffect } from "react"
import MealItem from "./MealItem"

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([])

  async function fetchMeals() {
    const response = await fetch("http://localhost:3000/meals")

    if (!response.ok) {
      throw new Error("Something went wrong!")
    }
    const meals = await response.json()
    console.log(meals)
    setLoadedMeals(meals)
  }

  useEffect(() => {
    fetchMeals()
  }, [])

  return (
    <ul id="meals">
      {loadedMeals.length !== 0 &&
        loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
    </ul>
  )
}
