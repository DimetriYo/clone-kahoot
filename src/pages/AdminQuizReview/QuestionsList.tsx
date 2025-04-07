import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  PropsWithChildren,
  SetStateAction,
} from "react"
import { usePostNewQuestion } from "./api/usePostNewQuestion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useGetAllQuestions } from "@/lib/useGetAllQuestions"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
  PropsWithChildren & {
    gameId: string
    setSelectedQuestionId: Dispatch<
      SetStateAction<{ id: string; number: number } | undefined>
    >
  }

export function QuestionsList({
  gameId,
  setSelectedQuestionId,
  children,
  ...props
}: Props) {
  const { data: questions } = useGetAllQuestions(gameId)

  const { mutate: addNewQuestion } = usePostNewQuestion((id: string) =>
    setSelectedQuestionId({ id, number: (questions?.length || 0) + 1 })
  )

  return (
    <aside {...props}>
      {children}
      <h3 className="font-bold text-xl">Questions</h3>

      <ul className="w-full">
        {questions &&
          questions.map(({ id }, index) => (
            <li
              key={id}
              onClick={() => setSelectedQuestionId({ id, number: index + 1 })}
              className="w-full truncate"
            >
              Question {index + 1}
            </li>
          ))}
        <li
          onClick={() =>
            addNewQuestion({
              gameId,
              text: "",
              acceptedAnswers: [""],
            })
          }
          className={cn(buttonVariants(), "w-full cursor-pointer")}
        >
          + Add new question
        </li>
      </ul>
    </aside>
  )
}
