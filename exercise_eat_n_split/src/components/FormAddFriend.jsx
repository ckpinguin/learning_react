import React, { useState } from "react"
import Button from "./Button"

export default function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !image) return

    // Better use uuidv4() (from uuid) for globally unique ids
    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0
    }
    onAddFriend(newFriend)
  }

  return (
    <form className="form-add-friend">
      <label>🤝Friend name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <label>📸Image URL</label>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <Button onClick={handleSubmit}>Add</Button>
    </form>
  )
}
