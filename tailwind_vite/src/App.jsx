import { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1 className="text-center text-xl font-semibold text-stone-700">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          🍕 Straight out of the oven, straight to you.
        </span>
      </h1>
    </div>
  )
}

export default App
