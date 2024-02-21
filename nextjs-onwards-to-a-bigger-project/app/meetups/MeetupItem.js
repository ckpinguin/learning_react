"use client"
import Card from "../ui/Card"
import classes from "./MeetupItem.module.css"
import { useRouter } from "next/navigation"

function MeetupItem(props) {
  const router = useRouter()

  // Navigate programmatically instead of using <Link> component
  function showDetailsHandler() {
    router.push("/meetups/", props.id)
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} width="600" height="480" alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  )
}

export default MeetupItem
