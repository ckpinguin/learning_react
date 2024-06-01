import { useState } from "react"
import Input from "./Input"

export default function Login() {
  /*   const [enteredEmail, setEnteredEmail] = useState("")
  const [enteredPassword, setEnteredPassword] = useState("") */
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  })

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  })

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@")
  const passwordIsInvalid =
    didEdit.password && enteredValues.password.trim().length < 6

  function handleSubmit(event) {
    event.preventDefault()
    console.log("Login form submitted")
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }))
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: false,
    }))
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: true,
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
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onChange={(event) => handleInputChange("email", event.target.value)}
          onBlur={() => handleInputBlur("email")}
          value={enteredValues.email}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          onBlur={() => handleInputBlur("password")}
          value={enteredValues.password}
        />
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
