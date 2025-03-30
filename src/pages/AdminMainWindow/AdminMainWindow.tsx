import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "react-router"
import { getAllQuizes } from "./api/getAllQuizes"

export function AdminMainWindow() {
  const quizes = getAllQuizes()

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <Card className="p-6">
        <nav className="flex flex-col gap-6">
          <Link className={buttonVariants()} to="create">
            + Create new Quiz
          </Link>
        </nav>
      </Card>

      <Card className="p-4">
        <ul>
          {quizes.map(({ id }, index) => (
            <li key={id}>
              <Link to={id}>Quiz #{index + 1}</Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
