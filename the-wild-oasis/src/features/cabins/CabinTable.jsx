import Spinner from "../../ui/Spinner"
import CabinRow from "./CabinRow"
import { useCabins } from "./useCabins"
import Table from "../../ui/Table"
import Menus from "../../ui/Menus"

export default function CabinTable() {
  const { isLoading, cabins, error } = useCabins()

  if (isLoading) return <Spinner />

  return (
    <Menus>
      <Table columns="0.8fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  )
}
