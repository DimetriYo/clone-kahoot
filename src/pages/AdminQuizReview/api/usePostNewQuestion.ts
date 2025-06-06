import { axiosInstance } from '@/constants'
import { Question, RawQuestion } from '@/types/Question'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const postNewQuestion = async (rawQuestion: RawQuestion) => {
  const newQuestionData = await axiosInstance.post<Question>(
    '/questions',
    rawQuestion
  )

  return newQuestionData.data
}

const createNewQuestion = async (
  rawQuestion: RawQuestion
): Promise<Question> => {
  const question = await postNewQuestion({
    gameId: rawQuestion.gameId,
    text: rawQuestion.text,
    img: rawQuestion.img,
  })

  return question
}

export const usePostNewQuestion = (
  handleSuccess?: (questionId: string) => void
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (rawQuestion: RawQuestion) => createNewQuestion(rawQuestion),
    onSuccess: (newQuestion) => {
      queryClient.invalidateQueries({
        queryKey: ['questions', newQuestion.gameId],
      })

      if (handleSuccess) {
        handleSuccess(newQuestion.id)
      }
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
