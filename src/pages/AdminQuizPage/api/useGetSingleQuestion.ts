import { useQuery } from '@tanstack/react-query'
import { questions } from '@/db/questions'
import { Question } from '@/types/question'

export const getQuestionById = async (questionId: string) => {
  const question = questions.find(({ id }) => id === questionId)
  if (!question)
    throw Error(`Question with id ${questionId} has not been found!`)

  return Promise.resolve(question)
}

export const useGetSingleQuestion = <T = Question>(
  questionId?: string,
  select?: (data: Question) => T
) =>
  useQuery({
    enabled: Boolean(questionId),
    queryKey: ['question', questionId],
    queryFn: () => getQuestionById(questionId!),
    select,
  })
