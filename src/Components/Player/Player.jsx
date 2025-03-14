import './Player.css'
import { useState } from 'react'

export const Player = ({ namePlayer, onChangeName, keyName, playerSymbol, onChangeSymbol, keySymbol, isActive, gameTurnsLength }) => {
    const [isEditing, setIsEditing] = useState(false)

    const handleClickButton = () => {
        setIsEditing((isEditing) => !isEditing)
    }



    const playerNameField = isEditing
        ? (<input type="text" name="" id='' required value={namePlayer}
            onChange={(event) => onChangeName(event, keyName)} />)
        : (<span className="player-name">{namePlayer}</span>)

    const playerSymbolField = isEditing
        ? (<input type="text" name="" id='' required maxLength='1' value={playerSymbol}
            onChange={(event) => onChangeSymbol(event, keySymbol, gameTurnsLength)} />)
        : (<span className="player-symbol">{playerSymbol}</span>)

    const buttonChangeValue = isEditing
        ? ("Guardar")
        : ("Cambiar")

    return (
        <>
            <li className={isActive ? 'active' : undefined}>

                <span className="player">
                    {playerNameField}
                    {playerSymbolField}
                </span>
                <button onClick={() => handleClickButton()} disabled={!isActive}>
                    {buttonChangeValue}</button>
            </li>
        </>
    )
}
