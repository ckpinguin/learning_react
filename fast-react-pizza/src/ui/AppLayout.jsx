import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom"
import Loader from "./Loader"

export default function AppLayout() {
  const navigation = useNavigation()
  // Loading indicator is active for all routes when defined here
  const isLoading = navigation.state === "loading"
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  )
}
