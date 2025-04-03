import { axiosInstance } from "@/constants"
import { Question } from "@/types/question"
import { useQuery } from "@tanstack/react-query"

const getActiveQuestion = async (questionId: string) => {
  const questionData = await axiosInstance.get<Question>(
    `/questions/${questionId}`
  )
  return questionData.data
}

export const useActiveQuestion = (questionId?: string) =>
  useQuery({
    queryKey: ["activeQuestion", questionId],
    queryFn: () => getActiveQuestion(questionId!),
    enabled: Boolean(questionId),
  })
