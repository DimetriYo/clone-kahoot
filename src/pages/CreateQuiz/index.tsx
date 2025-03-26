import { QuestionConstructor } from './QuestionConstructor'
import { QuestionsList } from './QuestionsList'

export function CreateQuiz() {
  return (
    <section>
      <QuestionsList />
      <QuestionConstructor />
    </section>
  )
}
