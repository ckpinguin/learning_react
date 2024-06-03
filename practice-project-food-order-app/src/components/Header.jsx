import logoImg from "../assets/logo.jpg"

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <h1>RFO - React Food Order</h1>
        <img src={logoImg} alt="A Restaurant" />
      </div>
      <nav>
        <button>Cart</button>
      </nav>
    </header>
  )
}
