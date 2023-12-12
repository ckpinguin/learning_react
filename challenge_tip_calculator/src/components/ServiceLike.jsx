import React, { useState } from "react"

export default function ServiceLike({ index, onSelect, children }) {
  const [serviceLike, setServiceLike] = useState(0)

  function handleUpdate(event) {
    const like = Number(event.target.value)
    setServiceLike(like)
    onSelect(index, like)
  }

  return (
    <div>
      <label htmlFor={`service-like-${index}`}>{children}</label>
      <select value={serviceLike} onChange={handleUpdate}>
        <option value="20">It was amazing! (20%)</option>
        <option value="10">It was good (10 %)</option>
        <option value="5">It was okay (5 %)</option>
        <option value="0">It was terrible (0 %)</option>
      </select>
    </div>
  )
}
