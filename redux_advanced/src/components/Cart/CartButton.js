import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../store/ui'

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  const clickHandler = () => dispatch(uiActions.toggleCartShow())
  return (
    <button onClick={clickHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
