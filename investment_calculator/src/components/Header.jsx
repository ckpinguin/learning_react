import logo from "../assets/investment-calculator-logo.png"

export default function Header({ children }) {
  return (
    <header id="header">
      <img src={logo} alt="Logo showing a money bag"></img>
      <h1>{children}</h1>
    </header>
  )
}
