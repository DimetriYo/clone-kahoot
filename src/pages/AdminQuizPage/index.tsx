import { Link, useParams } from 'react-router'
import { QuestionConstructor } from './QuestionConstructor'
import { QuestionsList } from './QuestionsList'
import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function AdminQuizPage() {
  const { quizId } = useParams()
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>()

  if (!quizId) {
    return null
  }

  return (
    <section className="grid grid-cols-[200px_1fr] h-full">
      <QuestionsList
        quizId={quizId}
        setSelectedQuestionId={setSelectedQuestionId}
        className="bg-blue-500 text-white p-4 h-full"
      >
        <Link className={cn(buttonVariants(), 'mb-4')} to="/">
          Go to main page
        </Link>
      </QuestionsList>
      <QuestionConstructor
        gameId={quizId}
        selecteQuestionId={selectedQuestionId}
        className="flex flex-col gap-10 p-4"
      />
    </section>
  )
}
