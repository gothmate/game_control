'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import styles from "../../app/(system)/page.module.sass"
import {IPlayers} from '@/types/interfaces'
import playersData from '@/data/players.json'
import {addNewPlayer} from '@/app/api/gets'

export default function Player() {
    const [name, setName] = useState("")
    const [players, setPlayers] = useState<[IPlayers]>([{  name: "",  played: 0, wins: 0, lastTimePlayed: "", lastGamePlayed: "", lastGameWin: "" }])

    function handlePlayer(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        const newPlayer = { 
            name: name, 
            played: 0,
            wins: 0,
            lastTimePlayed: "",
            lastGamePlayed: "",
            lastGameWin: "" 
        }

        await addNewPlayer(newPlayer)
        setName("")
    }

    useEffect(() => {
        const formattedPlayers = JSON.stringify(playersData, null, 4)
        setPlayers(JSON.parse(formattedPlayers))
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <a className={styles.btn} href="/">Home</a>
            </div>
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
            <div className={styles.content}>
                
                {players.map((player, index) => (
                    <fieldset className={styles.field} key={index}>
                        <legend>{player.name}</legend>
                        <div>
                            <p>Quantas vezes jogou: {player.played.toString()}</p>
                            <p>Ultima vez que jogou: {player.lastTimePlayed}</p>
                            <p>Ultimo jogo: {player.lastGamePlayed}</p>
                            <p>Ultima vitoria: {player.lastGameWin}</p>
                            <p>Total de vitorias: {player.wins?.toString()}</p>
                        </div>
                    </fieldset>
                ))}
            
            </div>
            <a className={styles.btn} href="/">
                Home
            </a>
        </main>
    )
}