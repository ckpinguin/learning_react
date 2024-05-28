import { useRef } from "react"

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef()

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers]
    shuffledAnswers.current.sort(() => Math.random() - 0.5) // 50% neg. or pos.
  }

  return (
    <ul id="answers">
      {answers.map((answer) => {
        const isSelected = selectedAnswer === answer
        let cssClass = ""

        if (
          answerState === "correct" ||
          (answerState === "wrong" && isSelected)
        ) {
          cssClass = answerState
        }
        if (answerState === "answered" && isSelected) {
          cssClass = "selected"
        }

        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
