"use client"

import { useState, useEffect, useRef, useCallback, ChangeEvent } from "react"
import styles from '@/app/(system)/page.module.sass'
import { ITodayGame, PlayingState } from "@/types/interfaces"
import {capitalizeFirstLetter, formatDate, formatTime} from "@/wrappers/functions"
import gamesData from '@/app/../data/games.json'
import playersData from '@/app/../data/players.json'
import Footer from "@/components/Footer"


export default function Playing() {
  const [session, setSession] = useState<PlayingState>({
    date: "",
    time: "00:00:00",
  })

  const [gamePlayed, setGamePlayed] = useState<ITodayGame | null>()

  const [onGame, setOnGame] = useState(1)
  const [game, setGame] = useState('')
  const [playersNow, setPlayersNow] = useState(1)

  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0) // ms

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  const tick = useCallback(() => {
    const now = Date.now()
    const newElapsed = now - startTimeRef.current
    setElapsed(newElapsed)
    setSession((prev) => ({
      ...prev,
      time: formatTime(newElapsed),
    }))
  }, [])

  const handleStart = () => {
    const now = new Date()
    startTimeRef.current = Date.now() - elapsed

    setSession((prev) => ({
      ...prev,
      date: capitalizeFirstLetter(formatDate(now)),
    }))

    setIsRunning(true)
    intervalRef.current = setInterval(tick, 100)
    console.log(session.time)
  }

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
  }

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
    setElapsed(0)
    setSession({ date: "", time: "00:00:00" })
  }

  function handleGame(e:ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
    setGame(e.target.value)
    console.log(game)
  }

  function handlePlayers(e:ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
    setPlayersNow(Number(e.target.value))
  }

  function handleGameSession() {
    gamesData.forEach(element => {
      if(element.name == game) {
        setGamePlayed(
          {
            players:null,
            game:{
              ...element,
              played: element.played + 1,
              lastPlayed: session.date,
              lastWinner: element.lastWinner,
              wins: element.wins +1,
              winner: "",
              lastGameDuration: element.lastGameDuration
            },
            duration: session.time
          }
        )
      }
    })
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
    console.log(gamePlayed)
  }

  function handleRecSession() {

  }


  useEffect(() => {
    gamesData.forEach(element => {
      if(element.name == game) {
        setOnGame(element.maxPlayers)
      }
    })
  }, [game])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      
        <div>
          <span>Qual jogo vai iniciar?</span>
          <select id="nowPlaying" name="nowPlaying" className={styles.input} onChange={e=>handleGame(e)}>
            <option value="none">---------------------------------------</option>
            {gamesData.map((game, index) => (
              <option value={game.name} key={index}>{capitalizeFirstLetter(game.name)}</option>
            ))}
          </select>
        </div>
        <div>
          <span>Quantos jogadores?</span><br />
          <select id="nowPlaying" name="nowPlaying" className={styles.inputNum} onChange={e=>handlePlayers(e)}>
            {Array.from({ length: onGame }, (_, i) => (
              <option key={i+1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        <fieldset className={styles.field}>
          <legend>Quem vai jogar?</legend>
          {playersData.map((player, index) => (
            <div key={index+"-"+player.name} id={index+"-"+player.name} className={styles.check}>
              <input type="checkbox" key={index} id={player.name} name={player.name} />
              <label htmlFor={player.name}> {capitalizeFirstLetter(player.name)}</label>
            </div>
          ))}
        </fieldset>

        <div>
            {/* Header */}
            <div>
                <span> ▶ Jogando {game} com {playersNow} jogador(es)</span>
                <h1>Session</h1>
            </div>

            {/* Clock Display */}
            <div>
            {/* Glow ring when running */}
            {isRunning && (
                <div/>
            )}

            {/* State debug badge */}
            <div> 
                <span>
                    Data:{" "}
                    <span className="text-[#a78bfa]">
                        {session.date ? `${session.date}  ` : 'Nao iniciada '}
                    </span>
                </span>
                <p>
                    Tempo decorrido: <span
                    className="text-6xl font-bold tracking-widest tabular-nums"
                    style={{
                    color: isRunning ? "#4ade80" : "#e5e7eb",
                    textShadow: isRunning
                        ? "0 0 30px rgba(74,222,128,0.5)"
                        : "none",
                    transition: "color 0.3s, text-shadow 0.3s",
                    }}>{session.time}</span>
                </p>
            </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3">
                {!isRunning ? (
                    <button
                    onClick={handleStart}
                    className={styles.btn}>
                    ▶ {elapsed > 0 ? "Retomar" : "Iniciar"}
                    </button>
                ) : (
                    <button
                    onClick={handleGameSession}
                    className={styles.btn}>
                    ⏸ Pausar
                    </button>
                )}

                <button onClick={handleReset} className={styles.btn}>
                    ↺
                </button>

                <button onClick={handleRecSession} className={styles.btn}>
                    ⏹ Finalizar jogo
                </button>
            </div>

            {/* Status indicator */}
            <div>
            <span
                className="w-2 h-2 rounded-full"
                style={{
                    background: isRunning ? "#4ade80" : "#374151",
                    boxShadow: isRunning ? "0 0 8px rgba(74,222,128,0.8)" : "none",
                    animation: isRunning ? "pulse 1s infinite" : "none",
                }}
            />
            {isRunning ? "Cronômetro ativo" : elapsed > 0 ? "Pausado" : "Aguardando início"}
            </div>
        </div>

        <style jsx>{`
            @keyframes pulse {
            0%, 100% { opacity: 1 }
            50% { opacity: 0.4 }
            }
        `}</style>
      </main>
      <Footer />
    </div>
  )
}