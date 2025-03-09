import './LogTurns.css'

export const LogTurns = ({ playerNames, playerSymbols, gameTurns }) => {

    const winnerMessage = (winnerName) => {
        return <span>
            👑 El Jugador: &nbsp;&nbsp;{winnerName} es el ganador 👑
        </span>
    }

    const draftText = <span>⚔ Nadie ha gandado, la partida ha terminado con un empate ⚔</span>
    return (
        <>
            <ol id="logTurns">
                {gameTurns.map((turn, index) => {

                    const isWinner = turn.hasWinner
                    const playerName = turn.symbol == playerSymbols.symbol1 ? playerNames.name1
                        : playerNames.name2
                    const isFinalTurn = gameTurns.length - index === 9

                    return (<li key={index}>
                        <p>Turno {(gameTurns.length - index)}:</p>
                        <p>{isWinner ? winnerMessage(playerName) : ''}</p>
                        <p>{isFinalTurn && !isWinner && draftText}</p>
                        <p>
                            {playerName} ha colocado el simbolo {turn.symbol} en las
                            coordenadas [{turn.square.rowIndex}][{turn.square.colIndex}]
                        </p>
                    </li>)
                })}
            </ol>

        </>
    )
}
