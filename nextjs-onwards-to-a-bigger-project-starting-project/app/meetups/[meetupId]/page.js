"use client"

import { usePathname } from "next/navigation"

import MeetupDetail from "@/app/meetups/MeetupDetail"

export default function MeetupDetails() {
  const path = usePathname()

  console.log(path)

  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/f/f7/Z%C3%BCrich_view_Quaibr%C3%BCcke_20200702.jpg"
      title="A First Meetup"
      address="Some address 5, 12345 Some City"
      description="This is a first meetup!"
    />
  )
}
