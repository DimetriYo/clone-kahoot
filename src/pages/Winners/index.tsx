import { WinnersTable } from "@/components/ui/WinnersTable"
import { useActiveGame } from "@/lib/useActiveGame"
import { useParams } from "react-router"

export function Winners() {
  const { gameId } = useParams()

  const { players } = useActiveGame(gameId!)

  return (
    <section>
      <h1 className="text-6xl font-bold">Winners</h1>
      <WinnersTable players={players} />
    </section>
  )
}
