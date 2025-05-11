import { Link, useParams } from "react-router"
import { QuestionConstructor } from "./QuestionConstructor"
import { QuestionsList } from "./QuestionsList"
import { useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function AdminQuizReview() {
  const { gameId } = useParams()
  const [selectedQuestion, setSelectedQuestion] = useState<{
    id: string
    number: number
  }>()

  if (!gameId) {
    return null
  }

  const isReadyToStartGame = true // TODO: disable start game btn when not all questions ready

  return (
    <section className="grid grid-cols-[200px_1fr] h-full">
      <QuestionsList
        gameId={gameId}
        selectedQuestionId={selectedQuestion?.id}
        setSelectedQuestionId={setSelectedQuestion}
        className="bg-blue-500 text-white p-4 h-full"
      >
        <Link to="/clone-kahoot/home" className={cn(buttonVariants(), "mb-4")}>
          Go to main page
        </Link>
      </QuestionsList>
      <div className="p-4 flex flex-col">
        {isReadyToStartGame ? (
          <Link
            to={`/clone-kahoot/${gameId}/admin/activeGame`} // TODO: test correctness of transitions
            className={cn(buttonVariants(), "self-end")}
          >
            Start this quiz
          </Link>
        ) : (
          <Button
            title="You need to fill question text and provide accepted answers to all the questions"
            disabled
            className="self-end"
          >
            Start this quiz
          </Button>
        )}
        {selectedQuestion && (
          <QuestionConstructor
            setSelectedQuestion={setSelectedQuestion}
            gameId={gameId}
            selectedQuestion={selectedQuestion}
            className="flex flex-col gap-10"
          />
        )}
      </div>
    </section>
  )
}
