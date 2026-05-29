'use server'

import fs from 'fs/promises'

export async function handleNewPlayer(newPlayer: { name: string; played: number }) {
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

export async function handleNewGame(newGame: {name: string; type: string} ) {
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