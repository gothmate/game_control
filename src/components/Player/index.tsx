'use client'
import { ChangeEvent, useState } from 'react'
import styles from '../../app/page.module.sass'

interface IPlayers {
    name: String
    played: Number
    wins?: Number
    lastTimePlayed?: Date
    lastGamePlayed?: String
    lastGameWin?: String
}

export default function Player() {
    const [name, setName] = useState("")
    const [playerInfo, setPlayerInfo] = useState<IPlayers>({name:"", played: 0})

    function handlePlayer(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

 
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setPlayerInfo(
            {
                name: name,
                played: 0 
            }
        )

        console.log(playerInfo)
    }

    return (
        <div className={styles.main}>
            <h2>Jogadores</h2>
            <h3>Registre os Jogadores!</h3>
            <form id="savePlayer" className={styles.content} onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Nome do Jogador"
                    name="player"
                    className={styles.input}
                    value={name}
                    onChange={handlePlayer}
                />
                
                <input type="submit" id="submit" className={styles.btn} value={"Gravar"} />
            </form>

            <h2>Jogadores salvos:</h2>

            <p>{playerInfo.name}</p>
            
        </div>
    )
}