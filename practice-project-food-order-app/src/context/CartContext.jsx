import { useReducer } from "react"
import { createContext } from "react"

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
})

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // Already in cart?
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    )
    const updatedItems = [...state.items]

    // If yes, update quantity
    if (existingCartItemIndex > -1) {
      const existingCartItem = state.items[existingCartItemIndex]
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      }
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      // New cart item, set quantity to default 1
      updatedItems.push({ ...action.item, quantity: 1 })
    }
    return { ...state, items: updatedItems }
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )
    const existingCartItem = state.items[existingCartItemIndex]

    // If this is the last item, remove it from the cart
    const updatedItems = [...state.items]
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1)
    } else {
      // otherwise reduce the quantity
      const updatableItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      }
      updatedItems[existingCartItemIndex] = updatedItems
    }
    return { ...state, items: updatedItems }
  }

  if (action.type === "CLEAR_CART") {
    console.log("clearing cart")
    return { ...state, items: [] }
  }

  return state
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

  const cartContext = {
    items: cart.items,
    addItem: (item) => dispatchCartAction({ type: "ADD_ITEM", item }),
    removeItem: (id) => dispatchCartAction({ type: "REMOVE_ITEM", id }),
    clearCart: () => dispatchCartAction({ type: "CLEAR_CART" }),
  }

  console.log(cartContext.items)
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  )
}

export default CartContext
