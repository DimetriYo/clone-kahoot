import { RawQuestion } from "@/types/question"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { questions } from "@/db/questions"

export const postNewQuestion = async (rawQuestion: RawQuestion) => {
  const newQuestion = { ...rawQuestion, id: crypto.randomUUID() }

  questions.push(newQuestion)

  return Promise.resolve(newQuestion)
}

export const usePostNewQuestion = (
  handleSuccess?: (questionId: string) => void
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (rawQuestion: RawQuestion) => postNewQuestion(rawQuestion),
    onSuccess: (newQuestion) => {
      queryClient.invalidateQueries({
        queryKey: ["questions", newQuestion.gameId],
      })

      if (handleSuccess) {
        handleSuccess(newQuestion.id)
      }
    },
  })
}
