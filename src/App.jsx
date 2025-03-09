import './App.css'

import { Player } from './Components/Player/Player'
import { GameBoard } from './Components/GameBoard/GameBoard.jsx'
import { LogTurns } from './Components/LogTurns/LogTurns.jsx'
import { GameOver } from './Components/GameOver/GameOver.jsx'

import { winningCombination } from './data/winningCombination.js'

import { useState } from 'react'


const setActivePlayer = (gameTurns, playerSymbols) => {
  if (gameTurns.length === 0) return playerSymbols.symbol1
  if (gameTurns.length > 4 && gameTurns[0].hasWinner) return gameTurns[0].symbol

  return (
    gameTurns[0].symbol === playerSymbols.symbol1
      ? playerSymbols.symbol2
      : playerSymbols.symbol1
  );
}

const setHasWinner = (prevGameTurns, newGameBoard) => {
  if (prevGameTurns.length >= 4) {

    for (const combination of winningCombination) {
      const [first, second, third] = combination
      const [firstSymbol, secondSymbol, thirdSymbol] = [
        newGameBoard[first.rowIndex][first.colIndex],
        newGameBoard[second.rowIndex][second.colIndex],
        newGameBoard[third.rowIndex][third.colIndex]
      ]

      if (firstSymbol && firstSymbol === secondSymbol && secondSymbol === thirdSymbol) {
        return { isWinner: true, winningCombination: combination }
      }
    }
    return false
  }
  return false
}


function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [playerNames, setPlayerNames] = useState({ name1: 'Jugador 1', name2: 'Jugador 2' })
  const [playerSymbols, setPlayerSymbols] = useState({ symbol1: 'X', symbol2: 'O' })

  const handleChangeName = (event, nameKey) => {
    setPlayerNames((prevPlayerNames) => ({
      ...prevPlayerNames,
      [nameKey]: event.target.value
    }));
  }

  const handleChangeSymbol = (event, symbolKey, gameTurnsLength) => {
    setPlayerSymbols((prevPlayerSymbols) => {
      const updatedSymbols = {
        ...prevPlayerSymbols,
        [symbolKey]: event.target.value
      }

      if (gameTurnsLength > 1) {
        alert('los símbolos solo se pueden cambiar en el prmer turno de cada jugador')
        return { ...prevPlayerSymbols }
      }

      if (updatedSymbols.symbol1 === updatedSymbols.symbol2) {
        alert('Los símbolos no pueden ser iguales')
        return { ...prevPlayerSymbols }
      }
      return updatedSymbols
    });
  }

  const handleSelectedSquare = (rowIndex, colIndex, gameBoard) => {
    setGameTurns((prevGameTurns) => {
      const actualSymbol = setActivePlayer(prevGameTurns, playerSymbols)
      let newGameBoard = [...gameBoard]
      newGameBoard[rowIndex][colIndex] = actualSymbol
      const hasWinner = setHasWinner(prevGameTurns, newGameBoard)

      const actualGameTurns = [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          symbol: actualSymbol,
          hasWinner: hasWinner
        },
        ...prevGameTurns
      ]

      return actualGameTurns
    })
  }

  const handleRestartGame = () => {
    setGameTurns([])
  }

  const activePlayer = setActivePlayer(gameTurns, playerSymbols)

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="playersContainer" className="highlight-player">
            <Player namePlayer={playerNames.name1} onChangeName={handleChangeName}
              keyName='name1' onChangeSymbol={handleChangeSymbol}
              keySymbol='symbol1' playerSymbol={playerSymbols.symbol1}
              isActive={activePlayer === playerSymbols.symbol1} gameTurnsLength={gameTurns.length} ></Player>
            <Player namePlayer={playerNames.name2} onChangeName={handleChangeName}
              keyName='name2' onChangeSymbol={handleChangeSymbol}
              keySymbol='symbol2' playerSymbol={playerSymbols.symbol2}
              isActive={activePlayer === playerSymbols.symbol2} gameTurnsLength={gameTurns.length} ></Player>
          </ol>
          {(gameTurns.length > 4 && gameTurns[0].hasWinner) &&
            <GameOver title='¡Revancha!' handleRestartGame={handleRestartGame} />}
          {(gameTurns.length > 8 && !gameTurns[0].hasWinner) &&
            <GameOver title='¡Otra Partida!' handleRestartGame={handleRestartGame} />}
          <GameBoard onSelectedSquare={handleSelectedSquare} gameTurns={gameTurns} />
        </div>
        <LogTurns playerNames={playerNames} playerSymbols={playerSymbols} gameTurns={gameTurns} />
      </main>
    </>
  )
}

export default App
