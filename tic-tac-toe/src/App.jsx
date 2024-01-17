import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winningCombinations"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X"
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"
  }
  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const currentPlayer = deriveActivePlayer(gameTurns)

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = combination[0]
    const secondSquareSymbol = combination[1]
    const thirdSquareSymbol = combination[2]
  }

  let gameBoard = initialGameBoard

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]
      return updatedTurns
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={currentPlayer === "X"}
            initialName="Player 1"
            symbol="X"
          />
          <Player
            isActive={currentPlayer === "O"}
            initialName="Player 2"
            symbol="O"
          />
        </ol>
        <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
