import { useCallback, useState } from "react"

import QuestionTimer from "./QuestionTimer.jsx"

import QUESTIONS from "../questions.js"
import quizCompleteImg from "../assets/quiz-complete.png"
import Answers from "./Answers.jsx"

const QUESTIONTIME = 10000

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([])
  const [answerState, setAnswerState] = useState("")

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered")
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer]
      })

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct")
        } else {
          setAnswerState("wrong")
        }

        setTimeout(() => {
          setAnswerState("")
        }, 2000)
      }, 1000)
    },
    [activeQuestionIndex]
  )

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  )

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz completed</h2>
      </div>
    )
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={QUESTIONTIME}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelectAnswer={handleSelectAnswer}
        />
      </div>
    </div>
  )
}