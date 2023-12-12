import "./App.css"
import InputBill from "./InputBill"
import Reset from "./Reset"
import ServiceLike from "./ServiceLike"
import TotalAmount from "./TotalAmount"
import React, { useState } from "react"

export default function App() {
  const [amount, setAmount] = useState(0)
  const [tipsPercentages, setTipsPercentages] = useState([0])

  const tipAcc = tipsPercentages.reduce((total, tip) => total + tip, 0)
  const tipTotal = (amount * (tipAcc / (tipsPercentages.length - 1))) / 100
  console.log(tipTotal)
  function handleTipUpdate(index, value) {
    setTipsPercentages(prevTips => {
      const newTips = [...prevTips]
      newTips[index] = value
      return newTips
    })
  }

  function handleAmountInput(event) {
    setAmount(event.target.value)
  }

  function handleReset() {
    setAmount(0)
    setTipsPercentages([0, 0])
  }

  return (
    <div>
      <InputBill onSetBill={handleAmountInput} amount={amount}>
        How much was the bill?
      </InputBill>
      <ServiceLike index="1" onSelect={handleTipUpdate}>
        How did you like the service?
      </ServiceLike>
      <ServiceLike index="2" onSelect={handleTipUpdate}>
        How did your friend like the service?
      </ServiceLike>
      <TotalAmount billAmount={Number(amount)} tipTotal={tipTotal} />
      <Reset onReset={handleReset} />
    </div>
  )
}
