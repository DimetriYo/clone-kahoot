import { axiosInstance } from "@/constants"
import { Question } from "@/types/question"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

export const patchUpdateQuestion = async ({ id, ...question }: Question) => {
  const questionData = await axiosInstance.put<Question>(
    `/questions/${id}`,
    question
  )

  return questionData.data
}

export const usePatchUpdateQuestion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedQuestion: Question) =>
      patchUpdateQuestion(updatedQuestion),
    onSuccess: (updatedQuestion) => {
      queryClient.invalidateQueries({
        queryKey: ["question", updatedQuestion.id],
      })
    },
    onError: (e) => {
      if (!(e instanceof AxiosError)) {
        toast(e.message)
      } else {
        toast(String(e.response?.data))
      }
    },
  })
}
