import Answers from "./Answers"
import QuestionTimer from "./QuestionTimer"

const QUESTIONTIME = 10000

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  onSkipAnswer,
  answerState,
}) {
  return (
    <div id="question">
      <QuestionTimer timeout={QUESTIONTIME} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  )
}
