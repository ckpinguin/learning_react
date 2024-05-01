import styled from "styled-components"
import { useRecentBookings } from "./useRecentBookings"
import Spinner from "../../ui/Spinner"
import { useRecentStays } from "./useRecentStays"
import { useCabins } from "../cabins/useCabins"
import Stats from "./Stats"

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

export default function DashboardLayout() {
  const { bookings, isLoadingBookings } = useRecentBookings()
  const {
    stays,
    numDays,
    confirmedStays,
    isLoading: isLoadingStays,
  } = useRecentStays()
  const { cabins, isLoading: isLoadingCabins } = useCabins()

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart of sales</div>
    </StyledDashboardLayout>
  )
}
