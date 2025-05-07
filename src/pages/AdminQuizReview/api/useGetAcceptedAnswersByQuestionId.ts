import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/constants'
import { AcceptedAnswer } from '@/types/AcceptedAnswer'

export const getAcceptedAnswersByQuestionId = async (questionId: string) => {
  const query = new URLSearchParams({ questionId })
  const questionData = await axiosInstance.get<AcceptedAnswer[]>(
    `/accepted-answers?${query.toString()}`
  )

  return questionData.data
}

export const useGetAcceptedAnswersByQuestionId = <T = AcceptedAnswer[]>(
  questionId?: string,
  select?: (data: AcceptedAnswer[]) => T
) =>
  useQuery({
    enabled: Boolean(questionId),
    queryKey: ['accepted-answers', questionId!],
    queryFn: () => getAcceptedAnswersByQuestionId(questionId!),
    select,
  })
