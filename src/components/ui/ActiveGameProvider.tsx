import {
  ActiveGameContext,
  DEV_WS_HOST,
  LS_USER_ID_KEY,
  PROD_WS_HOST,
} from '@/constants'
import { Fault, GameData, ShowAnswers, ShowWinners } from '@/types/Answers'
import { Player } from '@/types/Player'
import { ActiveGameQuestion } from '@/types/Question'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

type ParsedMessage = GameData | Fault | ShowAnswers | ShowWinners

let socket: any = null

const getSocket = () => {
  if (!socket) {
    socket = new WebSocket(import.meta.env.PROD ? PROD_WS_HOST : DEV_WS_HOST)
  }

  return socket
}

const isGameDataResponse = (resp: ParsedMessage): resp is GameData =>
  resp.type === 'GAME_DATA'

const isShowAnswersResponse = (resp: ParsedMessage): resp is ShowAnswers =>
  resp.type === 'SHOW_ANSWERS'

const isShowWinnersResponse = (resp: ParsedMessage): resp is ShowWinners =>
  resp.type === 'SHOW_WINNERS'

export function ActiveGameProvider({
  isAdmin,
  children,
}: { isAdmin?: boolean } & PropsWithChildren) {
  const navigate = useNavigate()
  const gameId = useParams().gameId
  const [players, setPlayers] = useState<Player[]>([])
  const [allQuestions, setAllQuestions] = useState<ActiveGameQuestion[]>([])
  const [activeQuestion, setActiveQuestion] =
    useState<ActiveGameQuestion | null>(null)
  const [sendMessage, setSendMessage] = useState<
    ((obj: { type: string; payload: any }) => void) | null
  >(null)
  const [playerAnswers, setPlayerAnswers] = useState<
    ShowAnswers['payload'] | null
  >(null)
  const userId = localStorage.getItem(LS_USER_ID_KEY)

  useEffect(() => {
    const socket = getSocket()

    if (socket.onopen) {
      return
    }

    socket.onopen = async () => {
      setSendMessage(
        () => (obj: { type: string; payload: any }) =>
          socket.send(JSON.stringify(obj))
      )

      if (isAdmin) {
        socket.send(JSON.stringify({ type: 'START_GAME', payload: { gameId } }))
      } else {
        socket.send(
          JSON.stringify({ type: 'PLAYER_CONNECTED', payload: { userId } })
        )
      }
    }

    socket.onmessage = (message: MessageEvent<string>) => {
      const parsedMessage = JSON.parse(message.data) as ParsedMessage

      if (isShowWinnersResponse(parsedMessage)) {
        if (!isAdmin) navigate('winners', { relative: 'path' })

        return
      }

      if (isShowAnswersResponse(parsedMessage)) {
        setPlayerAnswers(parsedMessage.payload)

        return
      }

      if (isGameDataResponse(parsedMessage)) {
        const { payload } = parsedMessage

        setPlayers(payload.players)
        setAllQuestions(payload.allQuestions)
        setActiveQuestion(
          payload.allQuestions.find(
            ({ id }) => id === payload.activeQuestionId
          )!
        )

        return
      }
    }

    socket.onclose = () => {
      console.log('WebSocket closed')
    }
  }, [])

  useEffect(() => {
    setPlayerAnswers(null)
  }, [activeQuestion])

  return (
    <ActiveGameContext.Provider
      value={{
        activeQuestion,
        allQuestions,
        playerAnswers,
        players,
        sendMessage,
      }}
    >
      {children}
    </ActiveGameContext.Provider>
  )
}
