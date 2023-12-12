import React, { useState } from "react"
import Button from "./Button"

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("")
  const [paidByUser, setPaidByUser] = useState("")
  const [whoIsPaying, setWhoIsPaying] = useState("user")

  const paidByFriend = bill ? bill - paidByUser : 0

  function handleSubmit(e) {
    e.preventDefault()

    if (!bill || !paidByUser) return

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser)
  }

  return (
    <form className="form-split-bill">
      <h2>
        Split a bill with {selectedFriend.name}{" "}
        <img
          className="rounded-img"
          src={selectedFriend.image}
          alt={selectedFriend.name}
        />
      </h2>
      <label>💰 Amount</label>
      <input
        type="tex"
        value={bill}
        onChange={e => setBill(Number(e.target.value))}
      />
      <label>🤦‍♂️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={e =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>🫅 {selectedFriend.name}'s expense</label>
      <input type="text" value={paidByFriend} disabled />
      <label>🤝 Who's paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={e => setWhoIsPaying(e.target.value)}
      >
        <option value="user">Me</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>
      <Button onClick={handleSubmit}>Split bill</Button>
    </form>
  )
}
