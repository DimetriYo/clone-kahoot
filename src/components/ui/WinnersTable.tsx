import { Player } from "@/types/Player"
import { DetailedHTMLProps, HTMLAttributes } from "react"

const getWinners = (players: Player[]) => {
  const palyersMap = players.reduce((acc, { id, name, answers }) => {
    const correctCtr = answers.filter(({ isCorrect }) => isCorrect).length
    acc.set(id, { name, correctCtr, id })
    return acc
  }, new Map<string, { name: string; correctCtr: number; id: string }>())

  return Array.from(palyersMap)
    .map(([, playerWithScore]) => playerWithScore)
    .sort((a, b) => b.correctCtr - a.correctCtr)
}

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  players: Player[]
}

export function WinnersTable({ players, ...props }: Props) {
  const winners = getWinners(players)

  return (
    <ul {...props}>
      {winners.map(({ name, correctCtr, id }, index) => (
        <li key={id}>
          <span>{index + 1}</span>. <span>{name}</span>:{" "}
          <span>{correctCtr}</span>
        </li>
      ))}
    </ul>
  )
}
