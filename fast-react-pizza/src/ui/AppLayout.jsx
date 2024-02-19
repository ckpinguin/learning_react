import Header from "./Header"
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom"
import Loader from "./Loader"

export default function AppLayout() {
  const navigation = useNavigation()
  // Loading indicator is active for all routes when defined here
  const isLoading = navigation.state === "loading"
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl overflow-scroll pb-2">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  )
}
