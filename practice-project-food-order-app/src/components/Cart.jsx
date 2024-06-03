import { useContext } from "react"
import CartContext from "../context/CartContext"
import { currencyFormatter } from "../util/formatting"
import Modal from "./UI/Modal"
import Button from "./UI/Button"
import UserProgressContext from "../context/UserProgressContext"
import CartItem from "./CartItem"

export default function Cart() {
  const { items, removeItem, addItem } = useContext(CartContext)
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext)

  const cartTotal = items
    .reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
    .toFixed(2)

  function handleCloseCart() {
    hideCart()
  }
  function handleGoToCheckout() {
    showCheckout()
  }

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onDecrease={() => removeItem(item.id)}
            onIncrease={() => addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">
        Total price: {currencyFormatter.format(cartTotal)}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 ? (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        ) : null}
      </p>
    </Modal>
  )
}
