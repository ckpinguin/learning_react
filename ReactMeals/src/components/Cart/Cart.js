import classes from './Cart.module.css'
import Modal from '../UI/Modal/Modal'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = (props) => {

    const cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        // Have to set explicitely the amount to 1 because otherwise amount
        // would be doubled on each click
        cartCtx.addItem({...item, amount: 1})
    }

    // Using bind() to pre-configure the function pointers to have arguments
    // pre-defined (so every CartItem gets its own function)
    // This is the same as using an anonymous function like:
    // onRemove={() => cartItemRemoveHandler(item.id)}
    // BENEFIT IS: We don't need to write onClick handlers in the 
    // child component (here: CartItem) to call the functions with the 
    // correct arguments
    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem
                key={item.id}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
                {...item} />
        ))}
    </ul>

    return (
        <Modal onClose={props.onClose}>
            <div className={classes.cart}>
                <h2>Your Shopping Cart</h2>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className={classes.actions}>
                    <button className={classes['button--alt']}
                    onClick={props.onClose}>Close</button>
                    {hasItems && <button className={classes.button}>Order</button>}
                </div>
            </div>
        </Modal>
    )
}

export default Cart