import { QuestionConstructor } from './QuestionConstructor'
import { QuestionsList } from './QuestionsList'

export function CreateQuiz() {
  return (
    <section className="grid grid-cols-[200px_1fr] h-full">
      <QuestionsList className="bg-blue-500 text-white p-4 h-full" />
      <QuestionConstructor className="flex flex-col gap-10 p-4" />
    </section>
  )
}
