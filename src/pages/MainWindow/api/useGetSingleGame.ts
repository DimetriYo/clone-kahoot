import { axiosInstance } from "@/constants"
import { Game } from "@/types/game"
import { useQuery } from "@tanstack/react-query"

const getSingleGame = (gameId: string) => {
  const game = axiosInstance.get<Game>(`/games/${gameId}`)

  return game
}

export const useGetSingleGame = (gameId: string) =>
  useQuery({ queryKey: ["game", gameId], queryFn: () => getSingleGame(gameId) })
