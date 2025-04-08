import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Players } from "@/components/ui/Players"
import { QuestionView } from "@/components/ui/QuestionView"
import { useActiveGame } from "@/lib/useActiveGame"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type UserAnswer = { answer: string }
const defaultValues = { answer: "" }

export function Player() {
  const { activeQuestion, players, sendMessage } = useActiveGame("")
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)

  const sendAnswerQuestion = (answer: any) => {
    const playerId = localStorage.getItem("userId")

    sendMessage!({
      type: "ANSWER_QUESTION",
      payload: { questionId: activeQuestion?.id, answer, playerId },
    })
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    reset,
  } = useForm({ defaultValues })

  // TODO: after all users gave answers show all answers

  const handleSend = ({ answer }: UserAnswer) => {
    sendAnswerQuestion(answer)
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const currentPlayer = players.find(({ id }) => userId && userId === id)

    if (!currentPlayer) {
      return
    }

    const currentAnswer = currentPlayer.answers.find(
      ({ questionId }) => activeQuestion && questionId === activeQuestion.id
    )

    reset({ answer: currentAnswer?.text || "" })

    setIsQuestionAnswered(Boolean(currentAnswer))
  }, [activeQuestion])

  useEffect(() => {
    reset()
  }, [isSubmitSuccessful])

  return (
    <div className="flex flex-col h-full justify-between">
      <section className="flex flex-col items-center gap-4 p-4">
        {activeQuestion && (
          <QuestionView text={activeQuestion.text} img={activeQuestion.img} />
        )}
        <Input
          aria-invalid={Boolean(errors.answer)}
          placeholder="Type your answer here!"
          disabled={isQuestionAnswered}
          {...register("answer", { required: "You can't submit empty answer" })}
          type="text"
        />
        {errors.answer && (
          <p className="text-red-300">
            "Please enter your answer. It is not allowed to submit empty answer"
          </p>
        )}
        <p>After submitting the answer you will not be able to change it.</p>
        <Button
          disabled={isQuestionAnswered}
          type="button"
          onClick={handleSubmit(handleSend)}
        >
          Send
        </Button>
      </section>
      <Players
        activeQuestionId={activeQuestion?.id}
        players={players}
        className="bg-purple-400 p-4 min-h-52"
      />
    </div>
  )
}
