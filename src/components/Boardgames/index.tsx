'use client'
import { ChangeEvent, useState } from 'react'
import styles from "../../app/(system)/page.module.sass"
import {IGameInfo} from '@/types/interfaces'


export default function Boardgames() {
    const [game, setGame] = useState("")
    const [gameType, setGameType] = useState("")
    const [gameInfo, setGameInfo] = useState<IGameInfo>({name:"", type:""})

    function setGameName(e: ChangeEvent<HTMLInputElement>) {
        setGame(e.target.value)
    }

    function setGameTypeName(e: ChangeEvent<HTMLSelectElement>) {
        setGameType(e.target.value)
    }

    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setGameInfo(
            {
                name: game,
                type: gameType
            }
        )

        console.log(gameInfo)
    }

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
                <select id="type" name="tipos" className={styles.input} onChange={setGameTypeName}>
                    <option value="none">----------------------</option>
                    <option value="Euro">Eurogame - Planejamento</option>
                    <option value="Coop">Cooperativo</option>
                    <option value="Festa">Jogo de Festa</option>
                    <option value="Blefe e Dedução">Blefe e Dedução</option>
                    <option value="Abstrato">Abstrato</option>
                    <option value="Construção de Baralho">Construção de Baralho</option>
                </select>
                
                <input type="submit" id="submit" className={styles.btn} value={"Gravar"} />
            </form>

            <h2>Jogos salvos:</h2>

            <p>Nome do Jogo: {gameInfo.name}</p>
            <p>Tipo: {gameInfo.type}</p>

        </div>
    )
}