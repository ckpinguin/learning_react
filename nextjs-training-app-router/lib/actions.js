"use server"

export async function shareMeal(formData) {
  // this creates a server action (function must be async)
  //"use server" // not necessary when in this separate actions.js filec
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  }
  //console.log(meal)
}
