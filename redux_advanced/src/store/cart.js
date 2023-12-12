import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    changed: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Normally, most of this work is done in the backend. This
        // is just here for demo purposes
        // Keep all fat code here, and when going into production, move it 
        // to the server
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items
        },
        addItem(state, action) {
            // must be action.payload!
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++
            state.changed = true
            if (existingItem) {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            } else {
                // Because we need totalPrice, just pushing „item“ is not
                // really much more efficient
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: +1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            }
        },
        removeItem(state, action) {
            const id = action.payload
            state.totalQuantity--
            const existingItem = state.items.find(item => item.id === id)
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        }
    }
})



export const cartActions = cartSlice.actions
export default cartSlice.reducer
