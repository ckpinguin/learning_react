import classes from './MealsSummary.module.css'

const MealsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>Delicious Food, not delivered to cats</h2>
            <p>All our meals are cooked without the help of cats!</p>
            <p>Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</p>
        </section>
    )
}

export default MealsSummary