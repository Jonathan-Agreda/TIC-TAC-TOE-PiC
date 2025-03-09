import './GameOver.css'

export const GameOver = ({ title, handleRestartGame }) => {
    return (
        <div id='gameOver'>
            <p>
                <button onClick={handleRestartGame}>{title}</button>
            </p>
        </div>
    )
}
