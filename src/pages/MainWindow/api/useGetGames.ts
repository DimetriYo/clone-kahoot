import { axiosInstance } from "@/constants"
import { Game } from "@/types/game"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

export const getAllUserGames = async () => {
  try {
    const gamesData = await axiosInstance.get<Game[]>(`/games`)

    return gamesData.data
  } catch (e: any) {
    if (!(e instanceof AxiosError)) {
      throw e
    }

    toast(String(e.response?.data || e.message))
  }
}

export const useGetGames = () =>
  useQuery({
    queryKey: ["games"],
    queryFn: () => getAllUserGames(),
    staleTime: Infinity,
  })
