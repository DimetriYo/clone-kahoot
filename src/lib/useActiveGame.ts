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

const isGameDataResponse = (
  resp:
    | { type: "GAME_DATA"; payload: ActiveGame }
    | { type: "FAULT"; payload: string }
    | { type: "SHOW_ANSWERS"; payload: { questionId: string } }
): resp is { type: "GAME_DATA"; payload: ActiveGame } =>
  resp.type === "GAME_DATA"

const isShowAnswersResponse = (
  resp:
    | { type: "GAME_DATA"; payload: ActiveGame }
    | { type: "FAULT"; payload: string }
    | { type: "SHOW_ANSWERS"; payload: { questionId: string } }
): resp is { type: "SHOW_ANSWERS"; payload: { questionId: string } } =>
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
  const [isShowAnswers, setIsShowAnswers] = useState(false)
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
      const parsedMessage = JSON.parse(message.data) as
        | { type: "GAME_DATA"; payload: ActiveGame }
        | { type: "FAULT"; payload: string }
        | { type: "SHOW_ANSWERS"; payload: { questionId: string } }
        | { type: "SHOW_WINNERS"; payload: null }

      if (parsedMessage.type === "SHOW_WINNERS") {
        if (!isAdmin) navigate("winners", { relative: "path" })

        return
      }

      if (isShowAnswersResponse(parsedMessage)) {
        setIsShowAnswers((prev) => !prev)

        return
      }

      if (!isGameDataResponse(parsedMessage)) {
        return
      }

      const { payload } = parsedMessage
      console.log(payload)

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
    setIsShowAnswers(false)
  }, [activeQuestion])

  return {
    players,
    sendMessage: sendMessageRef.current,
    allQuestions,
    activeQuestion,
    isShowAnswers,
  }
}
