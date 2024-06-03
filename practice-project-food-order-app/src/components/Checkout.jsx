import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../context/CartContext"
import { currencyFormatter } from "../util/formatting"
import Input from "./UI/Input"
import UserProgressContext from "../context/UserProgressContext"
import Button from "./UI/Button"

export default function Checkout() {
  const cartCtx = useContext(CartContext)
  const { progress, hideCheckout } = useContext(UserProgressContext)

  const cartTotal = cartCtx.items.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  )

  function handleClose() {
    hideCheckout()
  }

  return (
    <Modal open={progress === "checkout"}>
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
      <form>
        <Input
          label="Full Name"
          id="full-name"
          type="text"
          placeholder="Your Name"
          required
        />
        <Input label="E-Mail Address" type="email" id="email" required />
        <Input label="Street" type="text" id="street" required />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" required />
          <Input label="City" type="text" id="city" required />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  )
}
