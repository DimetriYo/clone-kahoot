import { QuestionView } from "@/components/ui/QuestionView"
import { useActiveGame } from "@/lib/useActiveGame"
import { Players } from "@/components/ui/Players"
import { Button } from "@/components/ui/button"

export function ActiveQuiz({ gameId }: { gameId: string }) {
  const { players, sendMessage, activeQuestion, allQuestions } = useActiveGame(
    gameId,
    true
  )

  return (
    <section className="grid grid-cols-[200px_1fr] h-full grid-rows-[1fr_200px]">
      <aside className="bg-orange-300 text-blue-600 p-4 h-full row-span-full">
        <h3 className="font-bold text-xl">Questions</h3>

        <ul className="w-full flex flex-col gap-2">
          {allQuestions &&
            allQuestions.map(({ id }, index) => (
              <li key={id} className="w-full">
                <Button
                  onClick={() =>
                    sendMessage!({
                      type: "CHANGE_QUESTION",
                      payload: { qusetionId: id },
                    })
                  }
                  className="w-full truncate"
                >
                  Question {index + 1}
                </Button>
              </li>
            ))}
        </ul>
      </aside>

      <div className="p-4">
        {activeQuestion && (
          <QuestionView text={activeQuestion.text} img={activeQuestion.img} />
        )}
      </div>
      <Players players={players} className="col-start-2 bg-purple-400 p-4" />
    </section>
  )
}
