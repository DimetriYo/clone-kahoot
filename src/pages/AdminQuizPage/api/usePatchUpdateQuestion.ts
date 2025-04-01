import { questions } from '@/db/questions'
import { Question } from '@/types/question'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const patchUpdateQuestion = async ({
  id: questionId,
  text,
  acceptedAnswers,
  img,
}: Omit<Question, 'gameId'>) => {
  const question = questions.find(({ id }) => id === questionId)

  if (!question) {
    return Promise.reject()
  }

  question.img = img
  question.text = text
  question.acceptedAnswers = acceptedAnswers

  return Promise.resolve(question)
}

export const usePatchUpdateQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedQuestion: Omit<Question, 'gameId'>) =>
      patchUpdateQuestion(updatedQuestion),
    onSuccess: (updatedQuestion) => {
      queryClient.invalidateQueries({
        queryKey: ['question', updatedQuestion.id],
      })
    },
  })
}
