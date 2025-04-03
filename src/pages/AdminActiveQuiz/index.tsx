import { useParams } from "react-router"
import { useGetAllQuestions } from "../AdminQuizReview/api/useGetAllQuestions"
import { useState } from "react"
import { useActiveQuestion } from "./api/useActiveQuestion"
import { QuestionView } from "@/components/ui/QuestionView"
import { useActiveGame } from "./api/useActiveGame"

export function AdminActiveQuiz() {
  const [activeQuestionId, setActiveQuestionId] = useState<string>()
  const { gameId } = useParams()
  const { players } = useActiveGame(gameId)
  const { data: questions } = useGetAllQuestions(gameId, (id: string) =>
    setActiveQuestionId(id)
  )
  const { data: activeQuestion } = useActiveQuestion(activeQuestionId)

  return (
    <section className="grid grid-cols-[200px_1fr] h-full grid-rows-[1fr_200px]">
      <aside className="bg-orange-300 text-blue-600 p-4 h-full row-span-full">
        <h3 className="font-bold text-xl">Questions</h3>

        <ul className="w-full">
          {questions &&
            questions.map(({ id }, index) => (
              <li key={id} className="w-full truncate">
                Question {index + 1}
              </li>
            ))}
        </ul>
      </aside>

      <div className="p-4">
        {activeQuestion && (
          <QuestionView text={activeQuestion.text} img={activeQuestion.img} />
        )}
      </div>

      <ul className="col-start-2 bg-purple-400 p-4 flex gap-4 items-start">
        {players.map(({ id, name, bgColor }) => (
          <li
            className="rounded-xl p-2 text-white"
            style={{ backgroundColor: bgColor }}
            key={id}
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  )
}
