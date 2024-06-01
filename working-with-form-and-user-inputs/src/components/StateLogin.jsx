import { useState } from "react"

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
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            type="email"
            onBlur={() => handleInputBlur("email")}
            value={enteredValues.email}
          />
          <div className="control-error">
            {emailIsInvalid && "Please enter a valid email addresse."}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            onBlur={() => handleInputBlur("password")}
            value={enteredValues.password}
          />
          <div className="control-error">
            {passwordIsInvalid &&
              "Password must be at least 6 characters long."}
          </div>
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
