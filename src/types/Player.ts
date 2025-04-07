export type Player = {
  id: string
  name: string
  bgColor: string
  answers: { questionId: string; text: string }[]
}
