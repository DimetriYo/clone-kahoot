import { axiosInstance } from "@/constants"
import { Game } from "@/types/game"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const postNewGame = async () => {
  const newGame: Game = await axiosInstance.post("/games")

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
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["games"] })
      handleSuccess(id)
    },
  })
}
