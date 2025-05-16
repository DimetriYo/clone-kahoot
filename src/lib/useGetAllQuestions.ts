import { axiosInstance } from '@/constants'
import { Question } from '@/types/Question'
import { useQuery } from '@tanstack/react-query'

export const getAllQuestions = async (gameId: string) => {
  const questionsData = await axiosInstance.get<Question[]>(`/questions`, {
    params: { gameId },
  })

  return questionsData.data
}

export const useGetAllQuestions = (gameId: string | undefined) =>
  useQuery({
    queryKey: ['questions', gameId],
    queryFn: async () => {
      const questions = await getAllQuestions(gameId!)

      return questions
    },
    enabled: Boolean(gameId),
  })
