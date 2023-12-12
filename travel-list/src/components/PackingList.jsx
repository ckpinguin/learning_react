import { useState } from "react"
import Item from "./Item"

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onDeleteList,
}) {
  const [sortBy, setSortBy] = useState("input")

  let sortedItems
  if (sortBy === "input") sortedItems = items
  if (sortBy === "name")
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed))

  return (
    <div className="list">
      <ul className="list">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDelete={onDeleteItem}
            onToggle={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="name">Sort by name</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onDeleteList}>Clear list</button>
      </div>
    </div>
  )
}
