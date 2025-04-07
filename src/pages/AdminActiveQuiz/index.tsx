import { useParams } from "react-router"
import { ActiveQuiz } from "./ActiveQuiz"

export function ActiveQuezWithGameId() {
  const { gameId } = useParams()

  if (!gameId) {
    return null
  }

  return <ActiveQuiz gameId={gameId} />
}
