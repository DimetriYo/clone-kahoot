import { questions } from '@/.db/questions'

export const getAllQuestions = (gameId: string) => {
  return questions.filter(({ gameId: dbGameId }) => dbGameId === gameId)
}
