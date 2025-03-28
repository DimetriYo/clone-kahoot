import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { getAllQuestions } from './api/getQuestions'

export function QuestionsList(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const questions = getAllQuestions('MOCK-game-id-1')

  return (
    <aside {...props}>
      <h3>Questions</h3>

      <ul className="w-full">
        {questions.map(({ id, text }) => (
          <li key={id} className="w-full truncate">
            {text}
          </li>
        ))}
      </ul>
    </aside>
  )
}
