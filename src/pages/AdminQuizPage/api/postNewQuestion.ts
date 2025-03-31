import { questions } from '@/db/questions'
import { RawQuestion } from '@/types/question'

export const postNewQuestion = (newQuestion: RawQuestion) => {
  questions.push({ ...newQuestion, id: crypto.randomUUID() })
}
