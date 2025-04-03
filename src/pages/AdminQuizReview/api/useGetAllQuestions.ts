import { axiosInstance } from "@/constants"
import { Question } from "@/types/question"
import { useQuery } from "@tanstack/react-query"

export const getAllQuestions = async (gameId: string) => {
  const questionsData = await axiosInstance.get<Question[]>(`/questions`, {
    params: { gameId },
  })

  return questionsData.data
}

export const useGetAllQuestions = (
  gameId: string | undefined,
  handleSuccess?: (id: string) => void
) =>
  useQuery({
    queryKey: ["questions", gameId],
    queryFn: async () => {
      const questions = await getAllQuestions(gameId!)

      if (handleSuccess) {
        handleSuccess(questions[0].id)
      }

      return questions
    },
    enabled: Boolean(gameId),
  })
