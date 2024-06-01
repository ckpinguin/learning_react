import { useState } from "react"

export default function Login() {
  /*   const [enteredEmail, setEnteredEmail] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("") */
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  })

  function handleSubmit(event) {
    event.preventDefault()
    console.log("Login form submitted")
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }))
  }

  /*   function handleEmailChange(event) {
    setEnteredEmail(event.target.value)
  }
  function handlePasswordChange(event) {
    setEnteredPassword(event.target.value)
  } */

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={enteredValues.email}
            onChange={(event) => handleInputChange("email", event.target.value)}
            type="email"
            name="email"
          />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={enteredValues.password}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            name="password"
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button type="submit" className="button">
          Login
        </button>
      </p>
    </form>
  )
}
