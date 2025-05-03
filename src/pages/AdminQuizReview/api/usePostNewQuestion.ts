import { axiosInstance } from "@/constants"
import { AcceptedAnswer } from "@/types/AcceptedAnswer"
import { Question, RawQuestion } from "@/types/question"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const postNewQuestion = async (
  rawQuestion: Omit<RawQuestion, "acceptedAnswers">
) => {
  const newQuestionData = await axiosInstance.post<Question>(
    "/questions",
    rawQuestion
  )

  return newQuestionData.data
}

const postNewAcceptedAnswers = async (
  rawAcceptedAnswers: Omit<AcceptedAnswer, "id">[]
) => {
  const acceptedAnswersCtr = await axiosInstance.post<AcceptedAnswer[]>(
    "/accepted-answers",
    rawAcceptedAnswers
  )

  return acceptedAnswersCtr.data
}

const getNewAcceptedAnswers = async (questionId: string) => {
  const query = new URLSearchParams({ questionId })
  const acceptedAnswers = await axiosInstance.post<AcceptedAnswer[]>(
    `/accepted-answers?${query.toString()}`
  )

  return acceptedAnswers.data
}

const createNewQuestion = async ({
  acceptedAnswers,
  ...rawQuestion
}: RawQuestion): Promise<Question> => {
  const question = await postNewQuestion(rawQuestion)
  await postNewAcceptedAnswers(
    acceptedAnswers.map((text) => ({ questionId: question.id, text }))
  )
  const answers = await getNewAcceptedAnswers(question.id)

  return { ...question, acceptedAnswers: answers.map(({ text }) => text) }
}

export const usePostNewQuestion = (
  handleSuccess?: (questionId: string) => void
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (rawQuestion: RawQuestion) => createNewQuestion(rawQuestion),
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
