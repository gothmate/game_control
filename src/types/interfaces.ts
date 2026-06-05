export interface IPlayers {
    name: string
    played: number
    wins: number
    lastTimePlayed: string
    lastGamePlayed: string
    lastGameWin: string
}


export interface IGameInfo {
    name: string
    type: string
    maxPlayers: number
    played: number
    lastPlayed: string
    lastWinner: string
    wins: number
    winner: string
    lastGameDuration: string
}

export interface ITodayGame {
    players: string[]
    game: IGameInfo
}

export interface PlayingState {
    date: string
    time: string
}