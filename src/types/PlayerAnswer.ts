export type PlayerAnswer = {
  playerId: string
  playerName: string
  playerAnswer: {
    questionId: string
    text: string | null
    isCorrect: boolean
  }
}
