import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link, useNavigate } from "react-router"
import { useGetGames } from "./api/useGetGames"
import { usePostAddNewGame } from "./api/usePostAddNewGame"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"

export function MainWindow() {
  const navigate = useNavigate()
  const { data: games } = useGetGames()
  const { mutate: postNewGame } = usePostAddNewGame({
    handleSuccess: (id: string) => {
      navigate(id)
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { gameId: "" } })

  const onJoinGameSubmit = ({ gameId }: { gameId: string }) => {
    console.log("Join game: " + gameId)
  }

  const handleMakeNewGameClick = async () => {
    postNewGame()
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Card className="p-6">
        <form onSubmit={handleSubmit(onJoinGameSubmit)} className="flex gap-2">
          <Input
            {...register("gameId", { required: "Enter valid game ID" })}
            aria-invalid={Boolean(errors.gameId)}
          />
          <Button type="submit">Join game</Button>
        </form>
        {Boolean(errors.gameId) && (
          <p className="text-red-300">{errors.gameId?.message}</p>
        )}

        <nav className="flex flex-col gap-6">
          <Button onClick={handleMakeNewGameClick}>+ Create new Quiz</Button>
        </nav>
      </Card>

      <Card className="p-4">
        {games && games.length !== 0 ? (
          <ul>
            {games?.map(({ id }, index) => (
              <li key={id}>
                <Link to={id + "/admin"}>Quiz #{index + 1}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't create any games yet.</p>
        )}
      </Card>
    </div>
  )
}
