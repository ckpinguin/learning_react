import { useState } from "react"

export default function SearchableList({ items, itemKeyFn, children }) {
  const [searchTerm, setSearchTerm] = useState("")

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="searchable-list">
      <input
        type="search"
        placeholder="Search"
        onChange={handleChange}
        value={searchTerm}
      />
      <ul>
        {searchResults.map((item, index) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  )
}
