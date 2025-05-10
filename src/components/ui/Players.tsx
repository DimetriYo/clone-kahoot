import { cn } from "@/lib/utils"
import { Player } from "@/types/Player"
import { PlayerAnswer } from "@/types/PlayerAnswer"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  players: Player[]
  activeQuestionId?: string
  playerAnswers: PlayerAnswer[] | null
}

export function Players({
  players,
  activeQuestionId,
  playerAnswers,
  ...props
}: Props) {
  return (
    <section {...props}>
      {playerAnswers && activeQuestionId ? (
        <ul className="flex flex-wrap">
          {playerAnswers.map(({ playerAnswer, playerId, playerName }) => {
            return (
              <li
                key={playerId}
                className={cn(
                  "rounded-full px-2 border-2 border-current bg-red-300",
                  playerAnswer?.isCorrect && "bg-green-400"
                )}
              >
                <span className="font-semibold">{playerName}:</span>{" "}
                {playerAnswer?.text || "No answer"}
              </li>
            )
          })}
        </ul>
      ) : (
        <>
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
        </>
      )}
    </section>
  )
}
