import { render, screen } from "@testing-library/react"
import Greeting from "./Greeting"

describe("Greeting component", () => {
  test("renders Hello World as a text", () => {
    // Arrange
    render(<Greeting />)

    // Act
    // ...nothing here

    // Assert
    const el = screen.getByText(/Hello World/, { exact: true })
  })
})
