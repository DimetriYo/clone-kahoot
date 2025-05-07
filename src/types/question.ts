export type RawQuestion = {
  gameId: string
  text: string
  img?: string
}

export type Question = RawQuestion & {
  id: string
}
