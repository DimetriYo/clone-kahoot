export type RawQuestion = {
  gameId: string
  text: string
  img?: string
}

export type Question = Omit<RawQuestion, 'img'> & {
  id: string
  img: string | null
}

export type ActiveGameQuestion = Pick<Question, 'id' | 'img' | 'text'>
