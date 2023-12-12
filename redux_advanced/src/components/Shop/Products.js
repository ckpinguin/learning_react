import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'Test',
    price: 6,
    description: 'This is a first product - amazing!'
  },
  {
    id: 'p2',
    title: 'A Book',
    price: 7.50,
    description: 'A Book of course'
  }
]

const productsList = (
  <ul>
    {
      DUMMY_PRODUCTS.map(item =>
        <ProductItem key={item.id} item={item} />
      )
    }
  </ul>
)

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {productsList}
    </section>
  );
};

export default Products;
