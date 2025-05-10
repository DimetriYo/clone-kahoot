import { axiosInstance } from "@/constants"
import { AcceptedAnswer } from "@/types/AcceptedAnswer"
import { Question } from "@/types/question"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

const deleteQuestion = async (questionId: string) => {
  const query = new URLSearchParams({ questionId })

  const deletedItems = await Promise.all([
    axiosInstance.delete<Question>(`/questions/${questionId}`),
    axiosInstance.delete<AcceptedAnswer[]>(`/accepted-answers?${query}`),
  ])

  return [deletedItems[0].data, deletedItems[1].data] as [
    Question,
    AcceptedAnswer[]
  ]
}

export const useDeleteQuestion = (handleSuccess: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (questionId: string) => deleteQuestion(questionId),
    onSuccess: ([deletedQuestion]: [Question, AcceptedAnswer[]]) => {
      queryClient.invalidateQueries({
        queryKey: ["question", deletedQuestion.id],
      })
      queryClient.invalidateQueries({
        queryKey: ["questions", deletedQuestion.gameId],
      })
      queryClient.invalidateQueries({
        queryKey: ["accepted-answers", deletedQuestion.id],
      })

      handleSuccess()
    },
    onError: (e) => {
      toast(e.message)
    },
  })
}
