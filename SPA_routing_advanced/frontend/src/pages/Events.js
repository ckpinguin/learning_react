import { useLoaderData, json, defer, Await } from 'react-router-dom'
import { Suspense } from 'react'
import EventsList from '../components/EventsList'

function EventsPage() {
    const { events } = useLoaderData()

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    )
}

export default EventsPage;

export const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events')
    if (!response.ok) {
        //return { isError: true, message: 'Could not fetch events.' }
        // Responses are more flexible to handling errors in the ErrorPage comp.
        //throw new Response(
        //    JSON.stringify({ message: 'Could not fetch events.' }),
        //    { status: 500 })
        // Even simpler is json from react-router-dom:
        throw json(
            { message: 'Could not fetch events.' },
            { status: 500 },
        )
    } else {
        const resData = await response.json()
        return resData.events
    }
}

export const loader = () => {
    return defer({
        // loadEvents must be async i.e. return a Promise when executed
        events: loadEvents()
    })
}

