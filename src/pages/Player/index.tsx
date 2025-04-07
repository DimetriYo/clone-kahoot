import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Players } from "@/components/ui/Players"
import { QuestionView } from "@/components/ui/QuestionView"
import { useActiveGame } from "@/lib/useActiveGame"
import { useForm } from "react-hook-form"

type UserAnswer = { answer: string }
const defaultValues = { answer: "" }

export function Player() {
  const { activeQuestion, players } = useActiveGame("")

  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
    reset,
  } = useForm({ defaultValues })

  const handleSend = ({ answer }: UserAnswer) => {
    console.log(answer)
    reset()
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <section className="flex flex-col items-center gap-4 p-4">
        {activeQuestion && (
          <QuestionView text={activeQuestion.text} img={activeQuestion.img} />
        )}
        <Input
          placeholder="Type your answer here!"
          disabled={isSubmitted}
          {...register("answer")}
          type="text"
        />
        <Button
          disabled={isSubmitted}
          type="button"
          onClick={handleSubmit(handleSend)}
        >
          Send
        </Button>
      </section>
      <Players players={players} className="bg-purple-400 p-4 min-h-52" />
    </div>
  )
}
