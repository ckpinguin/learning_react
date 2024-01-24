import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
}

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload
      state.isLoading = false
    },
    withdraw(state, action) {
      state.balance -= action.payload
    },
    requestLoan: {
      // Alternatively, we could just pass an object in
      // AccountOperations.requestLoan()
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        }
      },
      reducer(state, action) {
        if (state.loan > 0) return
        console.log(action)
        state.loan = action.payload.amount
        state.loanPurpose = action.payload.purpose
        state.balance += action.payload.amount
      },
    },
    payLoan(state) {
      state.balance -= state.loan
      state.loan = 0
      state.loanPurpose = ""
    },
    convertingCurrency(state) {
      state.isLoading = true
    },
  },
})

export const { withdraw, requestLoan, payLoan, convertingCurrency } =
  accountSlice.actions

export default accountSlice.reducer

// This is now the action creator instead of the automatically created
// one (from RTK ).
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount }

  // Using thunk for async side-effects
  // Never use Redux for remote state sync normally, but
  // this is a small, single datapoint, which is OK
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" })
    // API call
    const host = "api.frankfurter.app"
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await res.json()
    console.log(data)
    const converted = data.rates.USD
    dispatch({ type: "account/deposit", payload: converted })
  }
}
