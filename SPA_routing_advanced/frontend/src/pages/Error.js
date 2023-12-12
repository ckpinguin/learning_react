import { useRouteError } from 'react-router-dom'
import PageContent from '../components/PageContent'
import MainNavigation from '../components/MainNavigation'

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error)

    let title = 'An error occurred!'
    let message = 'Something went south!'

    if (error.status === 500) {
        message = error.data?.message || error.statusText || error.message
    }
    if (error.status === 404) {
        title = 'Not found!'
        message = 'Could not find the resource or page.'
    }
    return (
        <>
            <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage