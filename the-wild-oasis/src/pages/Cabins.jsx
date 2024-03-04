import { useState } from "react"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import CabinTable from "../features/cabins/CabinTable"
import Button from "../ui/Button"
import CreateCabinForm from "../features/cabins/CreateCabinForm"

function Cabins() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm(true)}>Add cabin</Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  )
}

export default Cabins
