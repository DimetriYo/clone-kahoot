import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { getAllQuestions } from './api/getAllQuestions'
import { Question } from '@/types/question'

export function QuestionsList({
  quizId,
  setSelectedQuestionId,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
  PropsWithChildren & {
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
      {children}
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
        <li onClick={() => setSelectedQuestionId(undefined)} className="w-full">
          + Add new question
        </li>
      </ul>
    </aside>
  )
}
