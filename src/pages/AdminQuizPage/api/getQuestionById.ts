import { questions } from "@/db/questions"

export const getQuestionById = (questionId: string) => {
  const question = questions.find(({ id }) => id === questionId)

  return question
}
