import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winningCombinations"
import GameOver from "./components/GameOver"

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

  let gameBoard = initialGameBoard

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  let winner = null
  for (const combination of WINNING_COMBINATIONS) {
    console.log(combination)
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    // Same symbol on all three squares
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner

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

  function handleRestart() {
    setGameTurns([])
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
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        {hasDraw && <GameOver />}
        <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
