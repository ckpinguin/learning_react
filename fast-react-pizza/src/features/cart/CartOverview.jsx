import { useSelector } from "react-redux"
import LinkButton from "../../ui/LinkButton"
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice"

function CartOverview() {
  // On-the-fly calculation of the total quantity in the cart
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)

  if (!totalCartQuantity) return null

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} Pizzas</span>
        <span>${totalCartPrice}</span>
      </p>
      <LinkButton to="/cart">Open cart &rarr;</LinkButton>
    </div>
  )
}

export default CartOverview
