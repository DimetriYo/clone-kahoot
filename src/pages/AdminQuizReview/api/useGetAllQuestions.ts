import { axiosInstance } from "@/constants"
import { Question } from "@/types/question"
import { useQuery } from "@tanstack/react-query"

export const getAllQuestions = async (gameId: string) => {
  const questionsData = await axiosInstance.get<Question[]>(`/questions`, {
    params: { gameId },
  })

  return questionsData.data
}

export const useGetAllQuestions = (gameId: string) =>
  useQuery({
    queryKey: ["questions", gameId],
    queryFn: () => getAllQuestions(gameId),
  })
