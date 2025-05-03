import { useQuery } from "@tanstack/react-query"
import { Question } from "@/types/question"
import { axiosInstance } from "@/constants"

export const getQuestionById = async (questionId: string) => {
  const questionData = await axiosInstance.get<Question>(
    `/questions/${questionId}`
  )

  return questionData.data
}

export const useGetSingleQuestion = <T = Question>(
  questionId?: string,
  select?: (data: Question) => T
) =>
  useQuery({
    enabled: Boolean(questionId),
    queryKey: ["question", questionId],
    queryFn: () => getQuestionById(questionId!),
    select,
  })
