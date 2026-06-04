'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import styles from "../../app/(system)/page.module.sass"
import {IGameInfo} from '@/types/interfaces'
import { handleNewGame } from '@/app/api/gets'
import gamesData from '../../data/games.json'



export default function Boardgames() {
    const [game, setGame] = useState("")
    const [players, setPlayers] = useState(1)
    const [gameType, setGameType] = useState("")
    const [games, setGames] = useState<[IGameInfo] | []>([])

    function setGameName(e: ChangeEvent<HTMLInputElement>) {
        setGame(e.target.value)
    }

    function setMaxPlayers(e: ChangeEvent<HTMLInputElement>) {
        setPlayers(Number(e.target.value))
    }

    function setGameTypeName(e: ChangeEvent<HTMLSelectElement>) {
        setGameType(e.target.value)
    }


    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        const newGame = { 
            name: game, 
            type: gameType, 
            maxPlayers: players, 
            played: 0,
            lastWinner: "",
            wins: 0,
            winner: "",
            lastGameDuration: ""
        }

        await handleNewGame(newGame)
    }

    useEffect(() => {
        const formattedGames = JSON.stringify(gamesData, null, 4)
        setGames(JSON.parse(formattedGames))
    }, [])
    

    return (
        <div className={styles.main}>
            <h2>Games</h2>
            <h3>Registre seus jogos!</h3>
            <form id="saveGame" className={styles.content} onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Nome do Jogo"
                    name="game"
                    className={styles.input}
                    value={game}
                    onChange={setGameName}
                />
                <span>Até quantos jogadores?</span><br/>
                <input 
                    type="number"
                    name="players"
                    className={styles.inputNum}
                    value={players}
                    onChange={setMaxPlayers}
                /><br/>
                <span>Escolha o tipo de jogo:</span>
                <select id="type" name="tipos" className={styles.input} onChange={setGameTypeName}>
                    <option value="none">----------------------</option>
                    <option value="Euro">Eurogame - Planejamento</option>
                    <option value="Coop">Cooperativo</option>
                    <option value="Festa">Jogo de Festa</option>
                    <option value="Blefe e Dedução">Blefe e Dedução</option>
                    <option value="Abstrato">Abstrato</option>
                    <option value="Construção de Baralho">Construção de Baralho</option>
                    <option value="Vaza">Jogo de Vaza</option>
                </select>
                
                <input type="submit" id="submit" className={styles.btn} value={"Gravar"} />
            </form>

            <div className={styles.main}>
                <h2>Jogos salvos:</h2><br />
                <ul>
                    {games.map((gameD, index) => (
                        <li key={index}>
                            <h3>{gameD.name} / Tipo: {gameD.type}</h3>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}