import ReactDOM from "react-dom/client"
import { StrictMode } from "react"
import App from "./src/App.jsx"
import "./index.css"
import { Provider } from "react-redux"
import store from "./src/store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
