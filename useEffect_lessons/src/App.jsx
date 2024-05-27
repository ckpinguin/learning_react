import { useEffect, useRef, useState, useCallback } from "react"

import Places from "./components/Places.jsx"
import { AVAILABLE_PLACES } from "./data.js"
import Modal from "./components/Modal.jsx"
import DeleteConfirmation from "./components/DeleteConfirmation.jsx"
import logoImg from "./assets/logo.png"
import { sortPlacesByDistance } from "./loc.js"

// This is run outside of the component function, so it is only run once when the module is loaded (performance).
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || []
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
)

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // This ref is used instead of using state to store the selected place (no need to re-render the component)
  const selectedPlace = useRef()

  const [availablePlaces, setAvailablePlaces] = useState([])
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces)

  // If you want to run a side effect after the component has been rendered, you can use the useEffect hook.
  useEffect(() => {
    // Side effect
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      )
      setAvailablePlaces(sortedPlaces)
      console.log("Your current position is:")
      console.log(`Latitude: ${position.coords.latitude}`)
      console.log(`Longitude: ${position.coords.longitude}`)
      console.log(`More or less ${position.coords.accuracy} meters.`)
    })
  }, [])

  // Possibility to run use saved storage on reload (not recommended for production)
  /*   useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || []
    const storedPlaces = storedIds.map((id) =>
      AVAILABLE_PLACES.find((place) => place.id === id)
    )
    setPickedPlaces(storedPlaces)
  }, [])
 */
  function handleStartRemovePlace(id) {
    setModalIsOpen(true)
    selectedPlace.current = id
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false)
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id)
      return [place, ...prevPickedPlaces]
    })

    // A side effect inside a handler is totally OK.
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || []
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem("selectedPlaces", JSON.stringify([id, ...storedIds]))
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    )
    setModalIsOpen(false)

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || []
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    )
  }, []) // No dependency means that this function is only created once.

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText={"Sorting places by distance ..."}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  )
}

export default App
