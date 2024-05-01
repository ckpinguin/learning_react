import GlobalStyles from "./styles/GlobalStyles"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

import { DarkModeProvider } from "./context/DarkModeContext"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./ui/ErrorFallback"
import ProtectedRoute from "./ui/ProtectedRoute"
import AppLayout from "./ui/AppLayout"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      // staleTime: 0,
    },
  },
})

export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          <GlobalStyles />
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "1rem",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-800)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </ErrorBoundary>
  )
}
