import { cn } from "@/lib/utils"
import { Player } from "@/types/Player"
import { DetailedHTMLProps, HTMLAttributes } from "react"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  players: Player[]
  activeQuestionId?: string
  isShowAnswers: boolean
}

export function Players({
  players,
  activeQuestionId,
  isShowAnswers,
  ...props
}: Props) {
  return (
    <section {...props}>
      {isShowAnswers && activeQuestionId ? (
        <ul className="flex flex-wrap">
          {players.map(({ name, answers, id }) => {
            const answer = answers.find(
              ({ questionId }) => activeQuestionId === questionId
            )

            return (
              <li
                key={id}
                className={cn(
                  "rounded-full px-2 border-2 border-current bg-red-300",
                  answer?.isCorrect && "bg-green-400"
                )}
              >
                <span className="font-semibold">{name}:</span> {answer?.text}
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
