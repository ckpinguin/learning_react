import { useState } from "react"

import QUESTIONS from "../questions.js"
import Question from "./Question.jsx"
import Summary from "./Summary.jsx"

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])

  const activeQuestionIndex = userAnswers.length
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer]
    })
  }

  function handleSkipAnswer() {
    handleSelectAnswer(null)
  }

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  )
}
