import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux'

const Cart = (props) => {

  const items = useSelector(state => state.cart.items)

  const cartItemsList = <ul>
    {items.map(item =>
      <CartItem
        key={item.id}
        item={item}
      />)}
  </ul>

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartItemsList}
    </Card>
  );
};

export default Cart;
