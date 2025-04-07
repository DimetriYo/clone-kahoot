import { Player } from "@/types/Player"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  players: (Player & { bgColor: string })[]
}

export function Players({ players, ...props }: Props) {
  return (
    <section {...props}>
      <h3 className="text-xl font-bold">Players ({players.length})</h3>
      <ul className="flex gap-4 items-start">
        {players.map(({ id, name, bgColor }) => (
          <li
            className="rounded-xl p-2 text-white"
            style={{ backgroundColor: bgColor }}
            key={id}
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}
