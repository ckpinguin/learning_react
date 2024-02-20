import { Form, redirect, useNavigation, useActionData } from "react-router-dom"
import { createOrder } from "../../services/apiRestaurant"
import Button from "../../ui/Button"
import { useDispatch, useSelector } from "react-redux"
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice"
import EmptyCart from "../cart/EmptyCart"
import store from "../../store"
import { formatCurrency } from "../../utils/helpers"
import { useState } from "react"
import { fetchAddress } from "../user/userSlice"

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  )

function CreateOrder() {
  const dispatch = useDispatch()
  const [withPriority, setWithPriority] = useState(false)
  const username = useSelector((state) => state.user.username)
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const formErrors = useActionData()

  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice

  if (!cart.length) return
  ;<EmptyCart />
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>
      <button onClick={() => dispatch(fetchAddress())}>Get position</button>

      <Form method="POST">
        {/* action not necessary, react-router uses nearest route by defaul */}
        {/*<Form method="POST" action="/order/new">*/}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            className="input grow"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" className="input w-full" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              className="input w-full"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* We add the cart as a hidden input because we are not able to get it
          from redux in the action below (hooks like „dispatch“ not available outside the component) */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  }
  const errors = {}
  if (!isValidPhone(data.phone)) {
    errors.phone =
      "Please enter a valid phone number, we might need it to contact you."
  }
  if (Object.keys(errors).length > 0) return errors

  // If all is good, we create the order and redirect to the order page
  const newOrder = await createOrder(order)
  // newOrder id comes already from the server

  // This is a hack using the store directly to clear the cart after the order is placed, don't use this too often. It's better to dispatch an action from the component.
  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
