import {useState} from "react"

export default function Player({initialName, symbol}) {
  const [isEditing, setIsEditing] = useState(false)
  const [playerName, setPlayerName] = useState(initialName)

  function handleEditClick() {
    // Never forget to use this construct instead of
    // (if updating state based on previous state)
    // directly setting the value (state updates are scheduled!)
    setIsEditing((isEditing) => !isEditing)
  }

  function handleChange(e) {
    const name = e.target.value
    setPlayerName(name)
  }

  return (
    <li>
      <span className="player">
        {isEditing ? (
          <input
            name="player-name"
            onChange={handleChange}
            value={playerName}
            required></input>
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
