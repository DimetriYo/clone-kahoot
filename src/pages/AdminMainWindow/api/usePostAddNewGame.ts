import { games } from '@/db/games'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const postNewGame = async () => {
  const gameId = crypto.randomUUID()
  const newGame = { id: gameId, questionIds: [] }

  games.push(newGame)

  return Promise.resolve(newGame)
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
      queryClient.invalidateQueries({ queryKey: ['games'] })
      handleSuccess(id)
    },
  })
}
