import { useState } from "react"

// eslint-disable-next-line react/prop-types
export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [playerName, setPlayerName] = useState(initialName)

  function handleEditClick() {
    // Never forget to use this construct instead of
    // (if updating state based on previous state)
    // directly setting the value (state updates are scheduled!)
    setIsEditing((isEditing) => !isEditing)
    if (isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  function handleChange(e) {
    const name = e.target.value
    setPlayerName(name)
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>
  if (isEditing) {
    editablePlayerName = (
      <input
        name="player-name"
        onChange={handleChange}
        value={playerName}
        required
      />
    )
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">{editablePlayerName}</span>
      <span className="player-symbol">{symbol}</span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
