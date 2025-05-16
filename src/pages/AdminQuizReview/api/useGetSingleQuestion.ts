import { useQuery } from '@tanstack/react-query'
import { Question } from '@/types/Question'
import { axiosInstance } from '@/constants'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const getQuestionById = async (questionId: string) => {
  try {
    const questionData = await axiosInstance.get<Question>(
      `/questions/${questionId}`
    )

    return questionData.data
  } catch (e) {
    if (!(e instanceof AxiosError)) {
      throw e
    }

    toast(String(e.response?.data))

    return
  }
}

export const useGetSingleQuestion = <T = Question>(
  questionId?: string,
  select?: (data: Question | undefined) => T
) =>
  useQuery({
    enabled: Boolean(questionId),
    queryKey: ['question', questionId],
    queryFn: () => getQuestionById(questionId!),
    select,
  })
