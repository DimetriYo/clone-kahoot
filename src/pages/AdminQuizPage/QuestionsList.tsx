import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { getAllQuestions } from "./api/getAllQuestions"
import { Question } from "@/types/question"

export function QuestionsList({
  quizId,
  setSelectedQuestionId,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  quizId: string
  setSelectedQuestionId: Dispatch<SetStateAction<string | undefined>>
}) {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    const newQuestions = getAllQuestions(quizId)

    setQuestions(newQuestions)
  }, [])

  return (
    <aside {...props}>
      <h3>Questions</h3>

      <ul className="w-full">
        {questions.map(({ id, text }) => (
          <li
            key={id}
            onClick={() => setSelectedQuestionId(id)}
            className="w-full truncate"
          >
            {text}
          </li>
        ))}
      </ul>
    </aside>
  )
}
