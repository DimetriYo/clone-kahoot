import { axiosInstance } from '@/constants'
import { Game } from '@/types/game'
import { useQuery } from '@tanstack/react-query'

export const getAllUserGames = async (userId: string) => {
  const searchParams = new URLSearchParams({ userId })

  const gamesData = await axiosInstance.get<Game[]>(
    `/games?${String(searchParams)}`
  )

  return gamesData.data
}

export const useGetGames = (userId: string | null) =>
  useQuery({
    queryKey: ['games', userId],
    queryFn: () => getAllUserGames(userId!),
    enabled: Boolean(userId),
  })
