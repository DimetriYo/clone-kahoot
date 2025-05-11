import { axiosInstance } from "@/constants"
import { AcceptedAnswer, RawAcceptedAnswer } from "@/types/AcceptedAnswer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

export const putUpdateAcceptedAnswers = async (
  questionId: string,
  newAnswers: RawAcceptedAnswer[]
) => {
  const query = new URLSearchParams({ questionId })

  const questionData = await axiosInstance.put<AcceptedAnswer[]>(
    `/accepted-answers/?${query.toString()}`,
    newAnswers
  )

  return questionData.data
}

export const usePutUpdateAcceptedAnswers = (questionId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedAcceptedAnswers: RawAcceptedAnswer[]) =>
      putUpdateAcceptedAnswers(questionId, updatedAcceptedAnswers),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accepted-answers", questionId],
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
