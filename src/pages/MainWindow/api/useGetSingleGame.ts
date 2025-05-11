import { axiosInstance } from "@/constants"
import { Game } from "@/types/game"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

const getSingleGame = async (gameId: string) => {
  try {
    return await axiosInstance.get<Game>(`/games/${gameId}`)
  } catch (e) {
    if (!(e instanceof AxiosError)) {
      throw e
    }

    toast(String(e.response?.data || e.message))
  }
}

export const useGetSingleGame = (gameId: string) =>
  useQuery({ queryKey: ["game", gameId], queryFn: () => getSingleGame(gameId) })
