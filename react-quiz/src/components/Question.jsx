import React from "react"
import { Options } from "./Options"
import { useQuiz } from "../contexts/QuizContext"

export default function Question({ question }) {
  const { answer, dispatch } = useQuiz()
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}
