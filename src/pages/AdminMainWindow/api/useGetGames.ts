import { useQuery } from '@tanstack/react-query'
import { games } from '@/db/games'

export const getAllGames = () => {
  return games
}

export const useGetGames = () =>
  useQuery({ queryKey: ['games'], queryFn: getAllGames })
