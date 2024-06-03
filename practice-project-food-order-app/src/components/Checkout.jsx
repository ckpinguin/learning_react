import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "../context/CartContext"
import { currencyFormatter } from "../util/formatting"
import Input from "./UI/Input"
import UserProgressContext from "../context/UserProgressContext"
import Button from "./UI/Button"
import useHttp from "../hooks/useHttp"
import Error from "./UI/Error"

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
}

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext)
  const { progress, hideCheckout } = useContext(UserProgressContext)
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig)

  const cartTotal = items.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  )

  function handleClose() {
    hideCheckout()
  }

  function handleFinish() {
    hideCheckout()
    clearCart()
    clearData()
  }
  function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const customerData = Object.fromEntries(formData.entries())
    const body = JSON.stringify({
      order: {
        customer: customerData,
        items: items,
      },
    })
    console.log(JSON.parse(body))
    sendRequest(body)
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  )

  if (isSending) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleClose}>
        <h2>Success!</h2>
        <p>Your order has been submitted successfully!</p>
        <p>Thank you for your purchase!</p>
        <Button onClick={handleFinish}>Okay</Button>
      </Modal>
    )
  }

  return (
    <Modal open={progress === "checkout"}>
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          id="name"
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
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  )
}
