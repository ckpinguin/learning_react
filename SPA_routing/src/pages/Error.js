import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    return <>
        <MainNavigation />
        <main>
            <h1>An error ocurred</h1>
            <p>HTTP 404 NOT FOUND</p>
        </main>
    </>
}

export default ErrorPage