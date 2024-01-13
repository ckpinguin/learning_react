import {useState} from "react"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      // Deep copy needed!
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ]
      updatedBoard[rowIndex][colIndex] = "X"
      return updatedBoard
    })
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}
