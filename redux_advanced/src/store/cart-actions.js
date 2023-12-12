import { uiActions } from "./ui"
import { cartActions } from "./cart"

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://trader-f2c8f-default-rtdb.europe-west1.firebasedatabase.app/cart.json')

            if (!response.ok) {
                throw new Error('Could not fetch cart data!')
            }
            const data = await response.json()

            return data
        }
        try {
            const cartData = await fetchData()
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                    totalAmount: cartData.totalAmount,
                })
            )
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!'
                })
            )
        }
    }
}



export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data.'
            })
        )
        // Wrap to make it async
        const sendRequest = async () => {
            const response = await fetch('https://trader-f2c8f-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalAmount: cart.totalAmount,
                        totalQuantity: cart.totalQuantity
                    })
                })

            if (!response.ok) {
                throw new Error('Sending cart data failed.')
            }
        }

        try {
            await sendRequest()
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!'
                })
            )
        }

        dispatch(
            uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            })
        )
    }
}