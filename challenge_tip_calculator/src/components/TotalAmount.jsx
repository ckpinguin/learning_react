export default function TotalAmount({ billAmount, tipTotal }) {
  return (
    <h2>
      You pay ${billAmount + tipTotal} (${billAmount} + ${tipTotal} tip)
    </h2>
  )
}
