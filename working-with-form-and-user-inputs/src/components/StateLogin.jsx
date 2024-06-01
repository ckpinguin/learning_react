import Input from "./Input"
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation"
import { useInput } from "../hooks/useInput"

export default function Login() {
  const {
    value: emailValue,
    hasError: emailHasError,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useInput("", (value) => {
    return isNotEmpty(value) && isEmail(value)
  })

  const {
    value: passwordValue,
    hasError: passwordHasError,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput("", (value) => {
    return hasMinLength(value, 6)
  })

  function handleSubmit(event) {
    event.preventDefault()
    if (emailHasError || passwordHasError) {
      return
    }
    console.log("Login form submitted")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          value={emailValue}
          error={emailHasError && "Please enter a valid email."}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          value={passwordValue}
          error={passwordHasError && "Password must be at least 6 characters."}
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
