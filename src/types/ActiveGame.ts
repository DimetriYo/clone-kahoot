import { Player } from './Player'
import { Question } from './Question'

export type ActiveGame = {
  id: string
  players: Player[]
  allQuestions: Question[]
  activeQuestionId: string
}
