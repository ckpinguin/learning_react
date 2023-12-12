import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import { useContext } from 'react'
import CartContext from '../../../store/cart-context'

const MealItem = ({ id, name, description, price }) => {
    const priceFormatted = `$${price.toFixed(2)}`
    const cartCtx = useContext(CartContext)

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price
        })
    }

    return <div key={id} className={classes.meal}>
        <h3>{name}</h3>
        <div className={classes.description}>
            {description}
        </div>
        <div className={classes.price}>
            {priceFormatted}
        </div>
        <div>
            <MealItemForm id={id} onAddToCart={addToCartHandler} />
        </div>

    </div>
}

export default MealItem