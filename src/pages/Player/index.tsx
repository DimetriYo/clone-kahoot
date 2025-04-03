import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QuestionView } from "@/components/ui/QuestionView"
import { useForm } from "react-hook-form"

type UserAnswer = { answer: string }
const defaultValues = { answer: "" }

export function Player() {
  const { img, text } = {
    img: "https://assets.weforum.org/article/image/responsive_large_0ZUBmNNVLRCfn3NdU55nQ00UF64m2ObtcDS0grx02fA.jpg",
    text: "What is good? And what is bad?",
  }

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
    <section className="flex flex-col items-center gap-4 p-4">
      <QuestionView text={text} img={img} />
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
  )
}
