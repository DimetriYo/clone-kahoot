import { questions } from "@/db/questions"

export const postNewAnswer = ({
  questionId,
  answers,
}: {
  questionId: string
  answers: string[]
}) => {
  const question = questions.find(({ id }) => id === questionId)

  if (!question) return

  question.acceptedAnswers = [...question.acceptedAnswers, ...answers]
}
