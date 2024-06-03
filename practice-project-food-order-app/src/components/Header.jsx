import { useContext } from "react"
import logoImg from "../assets/logo.jpg"
import CartContext from "../context/CartContext"
import Button from "./UI/Button"
import UserProgressContext from "../context/UserProgressContext"

export default function Header() {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext)

  const totalCartItems = cartCtx.items.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  )

  function handleShowCart() {
    userProgressCtx.showCart()
  }

  return (
    <header id="main-header">
      <div id="title">
        <h1>RFO - React Food Order</h1>
        <img src={logoImg} alt="A Restaurant" />
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart {totalCartItems > 0 ? `(${totalCartItems} items)` : ""}
        </Button>
      </nav>
    </header>
  )
}
