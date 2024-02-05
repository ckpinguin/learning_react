import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef()
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2)
  const userLost = remainingTime <= 0
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)
  // A facade or adapter to decouple the <dialog> from  outer
  // (i.e. „calling“) components
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal()
      },
    }
  })
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost ? <h2>You lost</h2> : null}
      {!userLost ? <h2>Your score: {score}</h2> : null}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button type="submit">Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  )
})

export default ResultModal
