'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import styles from "../../app/(system)/page.module.sass"
import {IPlayers} from '@/types/interfaces'
import playersData from '@/data/players.json'
import {handleNewPlayer} from '@/app/api/gets'

export default function Player() {
    const [name, setName] = useState("")
    const [players, setPlayers] = useState<[IPlayers] | []>([])

    function handlePlayer(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        const newPlayer = { name: name, played: 0 }

        await handleNewPlayer(newPlayer)
        setName("")
    }

    useEffect(() => {
        const formattedPlayers = JSON.stringify(playersData, null, 4)
        setPlayers(JSON.parse(formattedPlayers))
    }, [])

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
            <div className={styles.main}>
                <ul>
                    {players.map((player, index) => (
                        <li key={index}>
                            <h3>{player.name}</h3>
                            {/* <p>Quantas vezes jogou: {player.played.toString()}</p>
                            <p>Ultima vez que jogou: {player.lastTimePlayed}</p>
                            <p>Ultimo jogo: {player.lastGamePlayed}</p>
                            <p>Ultima vitoria: {player.lastGameWin}</p>
                            <p>Total de vitorias: {player.wins?.toString()}</p> */}
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    )
}