import { axiosInstance } from "@/constants"
import { Game } from "@/types/game"
import { useQuery } from "@tanstack/react-query"

export const getAllGames = async () => {
  const gamesData = await axiosInstance<Game[]>("/games")

  return gamesData.data
}

// TODO: on user loggin in make server set cookies to identify user

export const useGetGames = () =>
  useQuery({ queryKey: ["games"], queryFn: () => getAllGames() })
