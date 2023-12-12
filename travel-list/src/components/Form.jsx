import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function Form({ onAddItems }) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if (!name) {
      console.log("Name is empty or unset.")
      return
    }

    const generatedUUID = uuidv4()
    const newItem = { name, quantity, packed: false, id: generatedUUID }

    onAddItems(newItem)
    // Reset form
    setName("")
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        id="quantity"
        value={quantity}
        onChange={(e) => {
          //console.log(e.target.value)
          setQuantity(Number(e.target.value))
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        id="itemName"
        type="text"
        placeholder="Item..."
        value={name}
        onChange={(e) => {
          setName(e.target.value.trim())
        }}
      />
      <button>Add</button>
    </form>
  )
}
