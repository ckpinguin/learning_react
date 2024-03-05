import supabase, { supabaseUrl } from "./supabase"

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*")

  if (error) {
    console.error(error)
    throw new Error("Cabins could not get loaded")
  }

  return data
}

export async function createCabin(cabin) {
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "")
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image: imagePath }])

  if (error) {
    console.error(error)
    throw new Error("Cabin could not be created")
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image)

  // Delete the cabin if there was an error uploading the corresponding image
  if (storageError) {
    await supabase.from("cabins").delete().match(data.id)
    console.error(storageError)
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created."
    )
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
