import React from "react"
import { useQuiz } from "../contexts/QuizContext"

export default function Progress({ index }) {
  const { numQuestions, answer, points, maxPossiblePoints } = useQuiz()
  return (
    <header className="progress">
      {/* Trick to update progress bar before explicitely going to the next question */}
      <progress max={numQuestions} value={index + Number(answer != null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  )
}
