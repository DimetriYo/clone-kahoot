import { questions } from '@/db/questions'
import { Question } from '@/types/question'

export const patchUpdateQuestion = ({
  id: questionId,
  text,
  acceptedAnswers,
  img,
}: Omit<Question, 'gameId'>) => {
  const question = questions.find(({ id }) => id === questionId)

  if (!question) {
    return
  }

  question.img = img
  question.text = text
  question.acceptedAnswers = acceptedAnswers
}
