import { useState } from "react"

export default function UserInput({ userInput, onChange }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input
            value={userInput.initialInvestment}
            type="number"
            onChange={(e) => onChange("initialInvestment", e.target.value)}
            required
          />
        </p>
        <p>
          <label>Annual Investment</label>
          <input
            value={userInput.annualInvestment}
            type="number"
            onChange={(e) => onChange("annualInvestment", e.target.value)}
            required
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input
            value={userInput.expectedReturn}
            type="number"
            onChange={(e) => onChange("expectedReturn", e.target.value)}
            required
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            value={userInput.duration}
            type="number"
            onChange={(e) => onChange("duration", e.target.value)}
            required
          />
        </p>
      </div>
    </section>
  )
}
