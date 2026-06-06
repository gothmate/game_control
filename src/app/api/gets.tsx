'use server'

import fs from 'fs/promises'
import { ITodayGame, IGameInfo, IPlayers } from '@/types/interfaces'

export async function addNewPlayer(newPlayer: { name: string; played: number }) {
    const filePath = './src/data/players.json'

    try {
        const fileContent = await fs.readFile(filePath, 'utf8')
        const dataArray = JSON.parse(fileContent)

        dataArray.push(newPlayer)

        await fs.writeFile(filePath, JSON.stringify(dataArray, null, 2))
        console.log("Jogador adicionado com sucesso:", newPlayer)
    } catch (err) {
        console.error("Erro ao salvar jogador:", err)
    }
}

export async function addNewGame(newGame: {name: string; type: string} ) {
    const filePath = './src/data/games.json'

    try {
        const fileContent = await fs.readFile(filePath, 'utf8')
        const dataArray = JSON.parse(fileContent)

        dataArray.push(newGame)

        await fs.writeFile(filePath, JSON.stringify(dataArray, null, 2))
        console.log("Jogo adicionado com sucesso:", newGame)

    } catch (err) {
        console.error("Erro ao salvar o jogo:", err)
    }

}

export async function addGameSession(newSession: ITodayGame) {
    const gamesFilePath = "./src/data/games.json"
    const playersFilePath = "./src/data/players.json"
    const lastResultFilePath = "./src/data/lastResult.json"

    try {
        // Carrega os arquivos
        const gamesData = JSON.parse(
            await fs.readFile(gamesFilePath, "utf-8")
        )

        const playersData: IPlayers[] = JSON.parse(
            await fs.readFile(playersFilePath, "utf-8")
        )

        const lastResult = JSON.parse(
            await fs.readFile(lastResultFilePath, "utf-8")
        )

        const gameIndex = gamesData.findIndex(
            (game: IGameInfo) => game.name === newSession.game.name
        )

        if (gameIndex !== -1) {
            gamesData[gameIndex] = {
                ...gamesData[gameIndex],
                ...newSession.game,
            }
        }

        newSession.players?.forEach((playerName) => {
            const player = playersData.find(
                (p) => p.name === playerName
            )

            if (!player) return

            player.played = Number(player.played || 0) + 1
            player.lastTimePlayed = newSession.game.lastPlayed
            player.lastGamePlayed = newSession.game.name

            if (playerName === newSession.game.winner) {
                player.wins = Number(player.wins) + 1
                player.lastGameWin = newSession.game.name
            }
    
            console.log("Jogo vencido:")
            console.log(player.lastGameWin)
        })

        await fs.writeFile(
            lastResultFilePath,
            JSON.stringify(newSession, null, 2),
            "utf-8"
        )

        await fs.writeFile(
            gamesFilePath,
            JSON.stringify(gamesData, null, 2),
            "utf-8"
        )

        await fs.writeFile(
            playersFilePath,
            JSON.stringify(playersData, null, 2),
            "utf-8"
        )

        console.log("Sessão salva com sucesso!")
    } catch (err) {
        console.error("Erro ao salvar a sessão de jogo:", err)
    }
}