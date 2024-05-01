import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Dashboard from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Booking from "./pages/Booking"
import Checkin from "./pages/Checkin"
import Cabins from "./pages/Cabins"
import Users from "./pages/Users"
import Account from "./pages/Account"
import Settings from "./pages/Settings"
import PageNotFound from "./pages/PageNotFound"
import { Navigate } from "react-router-dom"

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { index: true, element: <Navigate replace to="dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "bookings", element: <Bookings /> },
      { path: "bookings/:bookingId", element: <Booking /> },
      { path: "checkin/:bookingId", element: <Checkin /> },
      { path: "cabins", element: <Cabins /> },
      { path: "users", element: <Users /> },
      { path: "account", element: <Account /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
])
