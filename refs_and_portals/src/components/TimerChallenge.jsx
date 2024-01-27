import { useState } from "react"
export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState()
  const [timerExpired, setTimerExpired] = useState()

  function handleStart() {
    setTimerStarted(true)
    setTimeout(() => {
      setTimerExpired(true)
    }, targetTime * 1000)
    return () => setTimerStarted(false)
  }

  function handleStop() {}
  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired && <p>You lost!</p>}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={handleStart}>
          {timerStarted ? "Stop Challenge" : "Start Challenge"}
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        {timerStarted ? "Time is running..." : "Timer inactive"}
      </p>
    </section>
  )
}