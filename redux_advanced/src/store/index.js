import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import counterReducer from './counter'
import cartReducer from './cart'
import uiReducer from './ui'



const store = configureStore({
    reducer: { counter: counterReducer, auth: authReducer, cart: cartReducer, ui: uiReducer }
})

export default store