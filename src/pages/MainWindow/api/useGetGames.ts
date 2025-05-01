import { axiosInstance } from "@/constants"
import { Game } from "@/types/game"
import { useQuery } from "@tanstack/react-query"

export const getAllUserGames = async () => {
  const gamesData = await axiosInstance.get<Game[]>(`/games`)

  return gamesData.data
}

export const useGetGames = () =>
  useQuery({
    queryKey: ["games"],
    queryFn: () => getAllUserGames(),
  })
