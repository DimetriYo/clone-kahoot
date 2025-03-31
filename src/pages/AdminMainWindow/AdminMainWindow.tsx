import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router'
import { useGetGames } from './api/useGetGames'
import { usePostAddNewGame } from './api/usePostAddNewGame'

export function AdminMainWindow() {
  const navigate = useNavigate()
  const { data: games } = useGetGames()
  const { mutate: postNewGame } = usePostAddNewGame({
    handleSuccess: (id: string) => {
      navigate(id)
    },
  })

  const handleMakeNewGameClick = async () => {
    postNewGame()
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Card className="p-6">
        <nav className="flex flex-col gap-6">
          <Button onClick={handleMakeNewGameClick}>+ Create new Quiz</Button>
        </nav>
      </Card>

      <Card className="p-4">
        <ul>
          {games?.map(({ id }, index) => (
            <li key={id}>
              <Link to={id}>Quiz #{index + 1}</Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
