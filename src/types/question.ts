export type RawQuestion = {
  gameId: string
  text: string
  acceptedAnswers: string[]
  img?: string
}

export type Question = RawQuestion & {
  id: string
}
