'use server'

import fs from 'fs/promises'

// export default async function handleNewPlayer(data: Object) {
//     const filePath = './src/data/players.json' 

//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error("Erro ao ler o arquivo de Dados:", err)
//             return
//         }

//         let dataArray: any[] = []
//         try {
//             console.log("API:", data)
//             dataArray = JSON.parse(data)
//             console.log("Array:", dataArray)

//         } catch (parseError) {
//             console.error("Erro ao fazer parse do conteúdo do arquivo:", parseError)
//             return
//         }

//         dataArray.push(data)    
        
//         const newDataString = JSON.stringify(dataArray, null, 2)

//         fs.writeFile(filePath, newDataString, function (err) {
//             if (err) {
//                 console.error("Erro ao salvar Data:", err)
//                 return
//             }
//             console.log("Novas informações adicionadas ao arquivo do Banco com sucesso.", newDataString)
//         })
//     })
// }

export default async function handleNewPlayer(newPlayer: { name: string; played: number }) {
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