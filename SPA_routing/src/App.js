import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Homepage from './pages/Home'
import Trades from './pages/Trades'
import RootLayout from './pages/Root'
import ErrorPage from './pages/Error'
import ProductsPage from "./pages/Products"
import ProductDetailPage from "./pages/ProductDetail"

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'trades', element: <Trades /> }
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
