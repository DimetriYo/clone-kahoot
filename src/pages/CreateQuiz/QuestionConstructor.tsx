import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"

type QuizQuestion = { text: string; acceptedAnswers: { answerText: string }[] }
const defaultValues: QuizQuestion = {
  text: "",
  acceptedAnswers: [{ answerText: "" }],
}

export function QuestionConstructor() {
  const { register, handleSubmit, control } = useForm<QuizQuestion>({
    defaultValues,
  })
  const onSubmit: SubmitHandler<QuizQuestion> = (data) => console.log(data)

  const { fields, append, remove } = useFieldArray({
    name: "acceptedAnswers",
    control,
  })

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
      <Label className="flex flex-col gap-10">
        <h3 className="text-4xl">New question</h3>
        <Input placeholder="Type in new question" {...register("text")} />
      </Label>

      <section className="flex flex-col gap-4">
        <h4 className="text-2xl">Type accepted answers</h4>
        <ul>
          {fields.map((field, index) => (
            <li key={field.id} className="flex gap-4">
              <Input
                placeholder="Accepted answer"
                {...register(`acceptedAnswers.${index}.answerText`)}
              />
              <Button onClick={() => remove(index)}>Remove</Button>
            </li>
          ))}
        </ul>
        <Button className="w-50" onClick={() => append({ answerText: "" })}>
          Add one more answer
        </Button>
      </section>

      <Input type="submit" />
    </form>
  )
}
