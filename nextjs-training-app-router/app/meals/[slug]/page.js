import Image from "next/image"
import classes from "./page.module.css"
import { getMeal } from "@/lib/meals"
import { notFound } from "next/navigation"

// for dynamic pages we need to export a function like this
export async function generateMetadata({ params }) {
  const meal = await getMeal(params.slug)

  if (!meal) {
    notFound()
  }

  return {
    title: meal.title,
    description: meal.summary,
  }
}

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
          <Image
            src={`https://nextjs-food-app-example.s3.eu-north-1.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
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
