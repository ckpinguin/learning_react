import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Error from "./ui/Error"
import Home from "./ui/Home"
import Menu, { loader as menuLoader } from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder from "./features/order/CreateOrder"
import Order from "./features/order/Order"
import AppLayout from "./ui/AppLayout"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, // generic error boundary
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />, // specific error boundary (inside layout)
      },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder /> },
      { path: "/order/:orderId", element: <Order /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
