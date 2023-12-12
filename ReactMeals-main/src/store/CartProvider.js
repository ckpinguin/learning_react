import { useReducer } from 'react'
import CartContext from './cart-context'


const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        // Calculate the total amount of the cart
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        // Find the index if the item already exists in the cart
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]

        let updatedItems
        // Updating the existing CartItem at found index
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            // concat (JS-native) returns a new array
            updatedItems = state.items.concat(action.item)
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    else if (action.type === 'REMOVE') {
        // Find the index if the item already exists in the cart
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        )
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingCartItem.price
        let updatedItems
        // Last item?
        if (existingCartItem.amount === 1) {
            // Filter out that item and return a new array without it
            updatedItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = {
                 ...existingCartItem,
                 amount: existingCartItem.amount -1
                }
            // Copy the array
            updatedItems = [...state.items]
            // Manipulate the array at index position
            updatedItems[existingCartItemIndex] = updatedItem
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}


const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item })
    }
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider