import { useEffect, useState } from "react"

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout)

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout)

    return () => {
      clearTimeout(timer)
    }
  }, [timeout, onTimeout])

  useEffect(() => {
    console.log("Setting interval")
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 50)
    }, 50)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return <progress id="question-time" max={timeout} value={remainingTime} />
}
