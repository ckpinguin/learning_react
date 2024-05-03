import sql from "better-sqlite3"
const db = sql("meals.db")

// async just for demo purposes
export async function getMeals() {
  // simulate a slow network
  await new Promise((resolve) => setTimeout(resolve, 2000))
  // Simulate error
  //throw new Error("Loading meals failed!")

  return db.prepare("SELECT * from meals").all()
}

export async function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug =   ?").get(slug)
}
