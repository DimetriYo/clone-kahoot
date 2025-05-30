import { axiosInstance } from "@/constants"
import { Game } from "@/types/game"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

export const postNewGame = async () => {
  const newGame = await axiosInstance.post<Game>("/games")

  return newGame
}

export const usePostAddNewGame = ({
  handleSuccess,
}: {
  handleSuccess: (newGameId: string) => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postNewGame,
    onSuccess: ({ data: { id } }) => {
      queryClient.invalidateQueries({ queryKey: ["games"] })
      handleSuccess(id)
    },
    onError: (e) => {
      if (!(e instanceof AxiosError)) {
        toast(e.message)
      } else {
        toast(String(e.response?.data))
      }
    },
  })
}
