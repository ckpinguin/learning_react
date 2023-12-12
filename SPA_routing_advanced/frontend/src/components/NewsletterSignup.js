import { useFetcher } from 'react-router-dom'
import { useEffect } from 'react'
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
    // use fetcher in order to have loaders/actions etc. used without
    // having a transition to the route where the loader/action is defined
    // (mostly parents)
    const fetcher = useFetcher()
    // Even data and state returned from the actions/loaders can be accessed
    // eslint-disable-next-line no-unused-vars
    const { data, state } = fetcher

    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message)
        }
    }, [data, state]
    )

    return (
        <fetcher.Form method='POST' action='/newsletter' className={classes.newsletter}>
            <input
                type="email"
                name='email'
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;