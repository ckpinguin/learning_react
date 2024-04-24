import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"

export function useBookings() {
  const [searchParams] = useSearchParams()

  // FILTER
  const filterValue = searchParams.get("status")
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", method: "eq", value: filterValue }

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc"
  const [field, direction] = sortByRaw.split("-")
  const sortBy = { field, direction }

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  })

  return { isLoading, bookings, count, error }
}