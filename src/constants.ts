import axios from 'axios'
import { Player } from './types/Player'
import { ActiveGameQuestion } from './types/Question'
import { PlayerAnswer } from './types/PlayerAnswer'
import { createContext } from 'react'

const DEV_BE_HOST = 'http://localhost:3000/api'
const PROD_BE_HOST = 'https://piggies-quiz-m5production.amvera.io/api'
export const DEV_WS_HOST = 'http://localhost:3000/'
export const PROD_WS_HOST = 'https://piggies-quiz-m5production.amvera.io/'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? PROD_BE_HOST : DEV_BE_HOST,
  timeout: 1000,
  withCredentials: true,
})

export const ActiveGameContext = createContext<{
  players: Player[]
  sendMessage: ((obj: { type: string; payload: any }) => void) | null
  allQuestions: ActiveGameQuestion[]
  activeQuestion: ActiveGameQuestion | null
  playerAnswers: PlayerAnswer[] | null
}>({
  activeQuestion: null,
  allQuestions: [],
  playerAnswers: null,
  players: [],
  sendMessage: null,
})

export const LS_USER_ID_KEY = 'userId'

export const DOMAIN = window.location.hostname

export const AUTH_COOKIE_NAME = 'authorization'
