import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartIsVisible: false,
    notification: null
}


const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleCartShow(state) {
            state.cartIsVisible = !state.cartIsVisible
        },
        showNotification(state, action) {
            const { status, title, message } = action.payload
            state.notification = {
                status: status,
                title: title,
                message: message
            }
        }

    }
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer