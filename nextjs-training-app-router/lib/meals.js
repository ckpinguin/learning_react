import fs from "node:fs"

import { S3 } from "@aws-sdk/client-s3"
import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"

const s3 = new S3({ region: "eu-north-1" })
const db = sql("meals.db")

// async just for demo purposes
export async function getMeals() {
  console.log("Loading meals...")
  // simulate a slow network
  await new Promise((resolve) => setTimeout(resolve, 2000))
  // Simulate error
  //throw new Error("Loading meals failed!")

  return db.prepare("SELECT * from meals").all()
}

export async function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug =   ?").get(slug)
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true })
  meal.instructions = xss(meal.instructions)

  const extension = meal.image.name.split(".").pop()
  const fileName = `${meal.slug}-${Math.random()}.${extension}`

  //const stream = fs.createWriteStream(`public/images/${fileName}`)
  const bufferedImage = await meal.image.arrayBuffer()

  await s3.putObject({
    Bucket: "nextjs-food-app-example",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  })
  /*   stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image")
    }
  }) */

  //meal.image = `/images/${fileName}`
  meal.image = fileName

  db.prepare(
    `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
  )`
  ).run(meal)
}
