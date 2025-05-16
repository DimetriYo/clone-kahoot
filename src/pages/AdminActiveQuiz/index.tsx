import { useParams } from 'react-router'
import { ActiveQuiz } from './ActiveQuiz'
import { ActiveGameProvider } from '@/components/ui/ActiveGameProvider'

export function ActiveQuezWithGameId() {
  const { gameId } = useParams()

  if (!gameId) {
    return null
  }

  return (
    <ActiveGameProvider isAdmin>
      <ActiveQuiz gameId={gameId} />
    </ActiveGameProvider>
  )
}
