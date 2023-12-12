import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store/cart'

const CartItem = (props) => {

  const { title, quantity, totalPrice, price } = props.item;
  const dispatch = useDispatch()
  const addHandler = () => {
    dispatch(cartActions.addItem(props.item))
  }
  const removeHandler = () => {
    dispatch(cartActions.removeItem(props.item.id))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeHandler}>-</button>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
