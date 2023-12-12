import { useState } from "react"
import "./App.css"

export default function App() {
  const [steps, setSteps] = useState(1)
  const [count, setCount] = useState(0)
  const handleStepChange = (e) => setSteps(+e.target.value)
  const handleCountChange = (e) => setCount(+e.target.value)
  const handleDown = () => setCount(count - steps)
  const handleUp = () => setCount(count + steps)
  const handleReset = () => setCount(0)

  return (
    <div className="center">
      <Stepper steps={steps} onChange={handleStepChange} />
      <Counter
        count={count}
        onChange={handleCountChange}
        onDown={handleDown}
        onUp={handleUp}
      />
      <Dater steps={steps} count={count} />
      <Resetter count={count} onClick={handleReset} />
    </div>
  )
}
function Resetter({ count, onClick }) {
  if (count !== 0) {
    return <button onClick={onClick}>Reset</button>
  }
}
function Stepper({ steps, onChange }) {
  return (
    <div>
      <input type="range" min="0" max="10" value={steps} onChange={onChange} />
      <span>Steps: {steps}</span>
    </div>
  )
}
function Counter({ count, onChange, onDown, onUp }) {
  return (
    <div>
      <button onClick={onDown}>-</button>
      <input type="text" value={count} onChange={onChange} />
      <button onClick={onUp}>+</button>
    </div>
  )
}

function Dater({ steps, count }) {
  const d = new Date()
  d.setDate(d.getDate() + count)

  return (
    <div>
      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
              ? `${count} days from today will be `
              : `${-count} days ago was `}
        </span>
        <span>{d.toLocaleDateString("de-CH")}</span>
      </p>
    </div>
  )
}
