import { Player } from "@/types/Player"
import { Question } from "@/types/question"
import { useEffect, useRef, useState } from "react"

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
): resp is { type: "GAME_DATA"; payload: ActiveGame } =>
  resp.type === "GAME_DATA"

export const useActiveGame = (gameId: string, isAdmin: boolean = false) => {
  const [players, setPlayers] = useState<Player[]>([])
  const [allQuestions, setAllQuestions] = useState<ActiveGameQuestion[]>([])
  const [activeQuestion, setActiveQuestion] =
    useState<ActiveGameQuestion | null>(null)
  const sendMessageRef = useRef<
    ((obj: { type: string; payload: any }) => void) | null
  >(null)
  const userId = localStorage.getItem("userId")

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

    socket.onclose = () =>
      socket.send(
        JSON.stringify({ type: "PLAYER_DISCONNECTED", payload: userId })
      )
  }, [])

  return {
    players,
    sendMessage: sendMessageRef.current,
    allQuestions,
    activeQuestion,
  }
}
