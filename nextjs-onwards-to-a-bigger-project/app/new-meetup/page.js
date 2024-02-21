"use client"
import NewMeetupForm from "@/app/meetups/NewMeetupForm"
import { useRouter } from "next/navigation"

function NewMeetupPage() {
  const router = useRouter()
  async function addMeetupHandler(enteredMeetupData) {
    //console.log(enteredMeetupData)

    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()

    console.log(data)
    router.push("/")
  }

  return (
    <div>
      <h1>The New Meetup Page</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </div>
  )
}

export default NewMeetupPage
