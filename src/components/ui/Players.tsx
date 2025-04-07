import { cn } from "@/lib/utils"
import { Player } from "@/types/Player"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  players: Player[]
  activeQuestionId?: string
}

export function Players({ players, activeQuestionId, ...props }: Props) {
  return (
    <section {...props}>
      <h3 className="text-xl font-bold">Players ({players.length})</h3>
      <ul className="flex gap-4 items-start">
        {players.map(({ id, name, bgColor, answers }) => (
          <li
            className={cn(
              "rounded-xl p-2 text-white",
              activeQuestionId &&
                answers.some(
                  ({ questionId }) => questionId === activeQuestionId
                ) &&
                "ring-amber-400 ring-8"
            )}
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
