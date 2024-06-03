import { currencyFormatter } from "../util/formatting"
import Button from "./UI/Button"

export default function CartItem({ item, onIncrease, onDecrease }) {
  const { name, quantity, price } = item

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} * {currencyFormatter.format(price)}
      </p>
      <p>
        <Button onClick={onDecrease}>-</Button>
        <span>{quantity}</span>
        <Button onClick={onIncrease}>+</Button>
      </p>
    </li>
  )
}
