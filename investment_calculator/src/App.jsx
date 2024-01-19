import { useState } from "react"

import Header from "./components/Header"
import Results from "./components/Results"
import UserInput from "./components/UserInput"

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  })

  const inputIsValid = userInput.duration >= 1

  function handleChange(inputId, newValue) {
    setUserInput((prevState) => {
      return {
        ...prevState,
        [inputId]: +newValue,
      }
    })
  }
  return (
    <>
      <Header>Investment Calculator</Header>
      <UserInput userInput={userInput} onChange={handleChange} />
      {inputIsValid ? (
        <Results input={userInput} />
      ) : (
        <p class="center">Please enter a positive duration</p>
      )}
    </>
  )
}

export default App
