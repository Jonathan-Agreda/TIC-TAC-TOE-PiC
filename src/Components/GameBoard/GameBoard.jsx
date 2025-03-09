import './GameBoard.css'

const initialGameBoard = Array.from({ length: 3 }, () => Array(3).fill(null))


export const GameBoard = ({ onSelectedSquare, gameTurns }) => {
    const gameBoard = [...initialGameBoard.map((array) => [...array])]

    const isWinningSquare = (rowIndexBoard, colIndexBoard) => {
        if (gameTurns.length > 4 && gameTurns[0].hasWinner) {
            return gameTurns[0].hasWinner.winningCombination.some(
                ({ rowIndex, colIndex }) => rowIndex === rowIndexBoard && colIndex === colIndexBoard
            )
        }
        return false
    }

    for (const turn of gameTurns) {
        const { square, symbol } = turn
        const { rowIndex, colIndex } = square
        gameBoard[rowIndex][colIndex] = symbol
    }

    return (
        <ol id='gameBoard'>
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((col, colIndex) => (
                            <li key={colIndex}>
                                <button
                                    className={isWinningSquare(rowIndex, colIndex) ? 'winningSquare' : ''}
                                    onClick={() => {
                                        if (gameTurns.length > 4 && gameTurns[0].hasWinner) return false
                                        if (gameBoard[rowIndex][colIndex] === null)
                                            onSelectedSquare(rowIndex, colIndex, gameBoard)
                                    }
                                    }>{col}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}
