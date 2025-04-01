import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  PropsWithChildren,
  SetStateAction,
} from "react"
import { useGetAllQuestions } from "./api/useGetAllQuestions"
import { usePostNewQuestion } from "./api/usePostNewQuestion"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export function QuestionsList({
  gameId,
  setSelectedQuestionId,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
  PropsWithChildren & {
    gameId: string
    setSelectedQuestionId: Dispatch<SetStateAction<string | undefined>>
  }) {
  const { data: questions } = useGetAllQuestions(gameId)

  const { mutate: addNewQuestion } = usePostNewQuestion(setSelectedQuestionId)

  return (
    <aside {...props}>
      {children}
      <h3>Questions</h3>

      <ul className="w-full">
        {questions &&
          questions.map(({ id, text }) => (
            <li
              key={id}
              onClick={() => setSelectedQuestionId(id)}
              className="w-full truncate"
            >
              {text}
            </li>
          ))}
        <li
          onClick={() =>
            addNewQuestion({
              gameId,
              text: "new question text",
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
