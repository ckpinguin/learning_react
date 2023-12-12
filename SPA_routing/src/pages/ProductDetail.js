import { useParams, Link } from 'react-router-dom'


const ProductDetailPage = () => {
    const params = useParams()
    const id = params.productId

    return (
        <>
            <h1>Product Details of {id}</h1>
            <Link to='..' relative='path'>Back to all products</Link>
        </>
    )
}

export default ProductDetailPage;