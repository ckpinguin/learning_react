import { useState } from "react"
import { Button } from "./Button"
import { StepMessage } from "./StepMessage"

const messages = ["Learn React", "Apply for jobs", "Invest your money"]

export default function Steps() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(true)

  const handlePrevious = () => {
    if (step > 1) {
      setStep((s) => s - 1)
    }
  }
  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1)
    }
  }
  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span>Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
