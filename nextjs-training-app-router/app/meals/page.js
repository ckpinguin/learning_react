import Link from "next/link"
import classes from "./page.module.css"

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your Favorite Recipe</Link>
        </p>
      </header>

      <main className={classes.main}>
        <h1>Meals Page</h1>
        <p>
          <Link href="/meals/abc">Meals Details</Link>
        </p>
        <p>
          <Link href="/meals/share">Share Meals</Link>
        </p>
        <p>
          <Link href="/community">Community Page</Link>
        </p>
      </main>
    </>
  )
}
