import { axiosInstance } from "@/constants"
import { RawQuestion } from "@/types/question"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const postNewQuestion = async (rawQuestion: RawQuestion) => {
  const newQuestionData = await axiosInstance.post("/questions", rawQuestion)

  return newQuestionData.data
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
