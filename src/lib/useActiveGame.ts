import { LS_USER_ID_KEY } from "@/constants"
import { Player } from "@/types/Player"
import { Question } from "@/types/question"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"

type ActiveGameQuestion = Pick<Question, "id" | "img" | "text">
type ActiveGame = {
  id: string
  players: Player[]
  allQuestions: Question[]
  activeQuestionId: string
}
type GameData = { type: "GAME_DATA"; payload: ActiveGame }
type Fault = { type: "FAULT"; payload: string }
type ShowAnswers = {
  type: "SHOW_ANSWERS"
  payload: {
    playerId: string
    playerAnswer: string | null
  }[]
}
type ShowWinners = { type: "SHOW_WINNERS"; payload: null }
type ParsedMessage = GameData | Fault | ShowAnswers | ShowWinners

const isGameDataResponse = (resp: ParsedMessage): resp is GameData =>
  resp.type === "GAME_DATA"

const isShowAnswersResponse = (resp: ParsedMessage): resp is ShowAnswers =>
  resp.type === "SHOW_ANSWERS"

export const useActiveGame = (gameId: string, isAdmin: boolean = false) => {
  const navigate = useNavigate()
  const [players, setPlayers] = useState<Player[]>([])
  const [allQuestions, setAllQuestions] = useState<ActiveGameQuestion[]>([])
  const [activeQuestion, setActiveQuestion] =
    useState<ActiveGameQuestion | null>(null)
  const sendMessageRef = useRef<
    ((obj: { type: string; payload: any }) => void) | null
  >(null)
  const [playerAnswers, setPlayerAnswers] = useState<
    | {
        playerId: string
        playerAnswer: string | null
      }[]
    | null
  >(null)
  const userId = localStorage.getItem(LS_USER_ID_KEY)

  useEffect(() => {
    const socket = new WebSocket(`${import.meta.env.VITE_DEV_API_WS}`)

    sendMessageRef.current = (obj: { type: string; payload: any }) =>
      socket.send(JSON.stringify(obj))

    socket.onopen = async () => {
      if (isAdmin) {
        socket.send(JSON.stringify({ type: "START_GAME", payload: { gameId } }))
      } else {
        socket.send(
          JSON.stringify({ type: "PLAYER_CONNECTED", payload: { userId } })
        )
      }
    }

    socket.onmessage = (message: MessageEvent<string>) => {
      const parsedMessage = JSON.parse(message.data) as ParsedMessage

      if (parsedMessage.type === "SHOW_WINNERS") {
        if (!isAdmin) navigate("winners", { relative: "path" })

        return
      }

      if (isShowAnswersResponse(parsedMessage)) {
        setPlayerAnswers(parsedMessage.payload)

        return
      }

      if (!isGameDataResponse(parsedMessage)) {
        return
      }

      const { payload } = parsedMessage

      setPlayers(payload.players)
      setAllQuestions(payload.allQuestions)
      setActiveQuestion(
        payload.allQuestions.find(({ id }) => id === payload.activeQuestionId)!
      )
    }

    socket.onclose = () => {
      console.log("WebSocket closed")
    }
  }, [])

  useEffect(() => {
    setPlayerAnswers(null)
  }, [activeQuestion])

  return {
    players,
    sendMessage: sendMessageRef.current,
    allQuestions,
    activeQuestion,
    playerAnswers,
  }
}
