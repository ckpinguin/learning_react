import { useEffect, useState } from "react"
import useDebounce from "./useDebounce"
// 'https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP,JPY,CHF'
// 'https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,CHF'

function App() {
  const [inputAmount, setInputAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState("CHF")
  const [toCurrency, setToCurrency] = useState("USD")
  const [converted, setConverted] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const debouncedAmount = useDebounce(inputAmount, 1000)

  useEffect(() => {
    const controller = new AbortController()
    async function convert() {
      setIsLoading(true)
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${debouncedAmount}&from=${fromCurrency}&to=${toCurrency}`,
        )
        const data = await res.json()

        if (data.rates) {
          console.log(data.rates[toCurrency])
          setConverted(data.rates[toCurrency])
        } else {
          console.log(data.message)
          setConverted(0)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (fromCurrency === toCurrency) {
      setConverted(debouncedAmount)
      return
    }

    convert()

    return () => {
      console.log("cleanup")
      controller.abort()
    }
  }, [debouncedAmount, fromCurrency, toCurrency])

  return (
    <div className="App">
      <input
        type="text"
        value={inputAmount}
        onChange={(e) => setInputAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="CHF">CHF</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="CHF">CHF</option>
      </select>
      <p>{isLoading ? "Loading..." : converted + " " + toCurrency}</p>
    </div>
  )
}

export default App
