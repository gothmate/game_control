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
}

export interface PlayData {
    players: [IPlayers]
    game: {
        todayGame: String
        played: Number
        lastPlayed?: String
        lastWinner?: String
        wins?: Number
        winner?: String
    }
}

export interface PlayingState {
  date: String
  time: String
}