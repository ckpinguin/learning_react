import { useNavigate } from 'react-router-dom'


function HomePage() {
    const navigate = useNavigate()

    // „Navigate“ to a component, not a href-link
    const navigateHandler = () => {
        navigate('Trades')
    }

    return (
        <>
            <h1>My Home Page</h1>
            <p>
                <button onClick={navigateHandler}>Navigate to Trades</button>
            </p>
        </>
    )
}

export default HomePage