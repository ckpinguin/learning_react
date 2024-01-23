import ReactDOM from "react-dom/client"
import { StrictMode } from "react"
import App from "./App.jsx"
import "./index.css"

import store from "./src/store"

store.dispatch({ type: "account/deposit", payload: 2500 })
console.log(store.getState())

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)
