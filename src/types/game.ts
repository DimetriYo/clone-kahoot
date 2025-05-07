export type Game = {
  id: string
  adminId: string
}

export type RawGame = Omit<Game, 'id'>
