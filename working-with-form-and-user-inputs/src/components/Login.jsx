import { useRef, useState } from "react"

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false)
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false)

  const email = useRef()
  const password = useRef()

  function handleSubmit(event) {
    event.preventDefault()
    console.log("Login form submitted")
    const enteredEmail = email.current.value
    const enteredPassword = password.current.value

    const emailIsValid = enteredEmail.includes("@")
    const passwordIsValid = enteredPassword.trim().length >= 6

    if (!emailIsValid) {
      setEmailIsInvalid(true)
    }
    if (!passwordIsValid) {
      setPasswordIsInvalid(true)
    }

    console.log(enteredEmail, enteredPassword)
    // NOT recommended to use this in production:
    email.current.value = ""
    // Better use this to clear the form as a whole:
    event.target.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
          <div className="control-error">
            {passwordIsInvalid && (
              <p>Password must be at least 6 characters long.</p>
            )}
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
