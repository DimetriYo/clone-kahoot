import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Link } from 'react-router'

export function AdminModeChoose() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="p-6">
        <nav className="flex flex-col gap-6">
          <Link className={buttonVariants()} to="create">
            Create Quiz
          </Link>
          <Link className={buttonVariants()} to="game">
            StartGame
          </Link>
        </nav>
      </Card>
    </div>
  )
}
