import { createContext } from "react"

export const CartContext = createContext({
  items: [],
  addItemToCart: (item) => {}, // dummy function for autocompletion
  updateItemQuantity: (productId, amount) => {}, // dummy function for autocompletion
})
