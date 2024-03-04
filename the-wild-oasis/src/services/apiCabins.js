import supabase from "./supabase"

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*")

  if (error) {
    console.error(error)
    throw new Error("Cabins could not get loaded")
  }

  return data
}

export async function createCabin(cabin) {
  const { data, error } = await supabase.from("cabins").insert([cabin])

  if (error) {
    console.error(error)
    throw new Error("Cabin could not be created")
  }

  return data
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().match({ id })

  if (error) {
    console.error(error)
    throw new Error("Cabin could not be deleted")
  }
}
