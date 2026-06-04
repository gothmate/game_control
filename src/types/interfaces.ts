export interface IPlayers {
    name: String
    played: Number
    wins?: Number
    lastTimePlayed?: String
    lastGamePlayed?: String
    lastGameWin?: String
}


export interface IGameInfo {
    name: String
    type: String
    maxPlayers: Number
    played?: Number
    lastPlayed?: String
    lastWinner?: String
    wins?: Number
    winner?: String
    lastGameDuration?: String
}

export interface ITodayGame {
    players: [IPlayers]|null
    game: IGameInfo
    duration: String
}

export interface PlayingState {
    date: String
    time: String
}