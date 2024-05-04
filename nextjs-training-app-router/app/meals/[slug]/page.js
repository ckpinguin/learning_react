import Image from "next/image"
import classes from "./page.module.css"
import { getMeal } from "@/lib/meals"
import { notFound } from "next/navigation"

export default async function MealsDetailsPage({ params }) {
  const meal = await getMeal(params.slug)

  meal.instructions = meal.instructions.replace(/\n/g, "<br />")

  if (!meal) {
    notFound()
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main className="">
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>
      </main>
    </>
  )
}