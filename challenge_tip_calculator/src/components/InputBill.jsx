export default function InputBill({ amount, onSetBill, children }) {
  return (
    <div>
      <label htmlFor="bill-amount">{children}</label>
      <input
        id="bill-amount"
        type="number"
        value={amount}
        onInput={onSetBill}
      />
    </div>
  )
}
