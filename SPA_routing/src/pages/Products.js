import { Link } from 'react-router-dom'

const products = [
    { id: '1', name: 'Product 1', description: 'This is the description for product 1' },
    { id: '2', name: 'Product 2', description: 'This is the description for product 2' },
    { id: '3', name: 'Product 3', description: 'This is the description for product 3' },
]

const ProductsPage = () => {


    const productsList = products.map((product) => (
        <li key={product.id}>
            <Link to={product.id}>
                {product.name}
            </Link>
        </li>
    ))

    return (
        <div>
            <h1>Products Page</h1>
            <ul>
                {productsList}
            </ul>
        </div>
    );
}

export default ProductsPage;