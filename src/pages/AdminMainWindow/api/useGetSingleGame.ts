import { games } from '@/db/games'
import { useQuery } from '@tanstack/react-query'

const getSingleGame = (gameId: string) => {
  const game = games.find(({ id }) => gameId === id)

  return game
}

export const useGetSingleGame = (gameId: string) =>
  useQuery({ queryKey: ['game', gameId], queryFn: () => getSingleGame(gameId) })
