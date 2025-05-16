import { ActiveGame } from './ActiveGame'
import { PlayerAnswer } from './PlayerAnswer'

export type GameData = { type: 'GAME_DATA'; payload: ActiveGame }
export type Fault = { type: 'FAULT'; payload: string }
export type ShowAnswers = {
  type: 'SHOW_ANSWERS'
  payload: PlayerAnswer[]
}
export type ShowWinners = { type: 'SHOW_WINNERS'; payload: null }
