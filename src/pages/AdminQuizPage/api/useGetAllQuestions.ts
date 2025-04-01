import { useQuery } from "@tanstack/react-query"
import { questions } from "@/db/questions"

export const getAllQuestions = async (gameId: string) => {
  return Promise.resolve(
    questions.filter(({ gameId: dbGameId }) => dbGameId === gameId)
  )
}

export const useGetAllQuestions = (gameId: string) =>
  useQuery({
    queryKey: ["questions", gameId],
    queryFn: () => getAllQuestions(gameId),
  })
