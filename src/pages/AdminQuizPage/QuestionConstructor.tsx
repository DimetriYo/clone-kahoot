import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DetailedHTMLProps, FormHTMLAttributes, useEffect } from "react"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { getQuestionById } from "./api/getQuestionById"
import { Question } from "@/types/question"

type Props = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & { selecteQuestionId?: string }

const defaultValues: Question = {
  text: "",
  acceptedAnswers: [],
}

export function QuestionConstructor({ selecteQuestionId, ...props }: Props) {
  const { register, handleSubmit, control, reset } = useForm<Question>({
    defaultValues,
  })

  useEffect(() => {
    if (selecteQuestionId) {
      const newQuestion = getQuestionById(selecteQuestionId)

      reset(newQuestion)
    }
  }, [selecteQuestionId])

  const onSubmit: SubmitHandler<Question> = (data) => console.log(data)

  const { fields, append, remove } = useFieldArray({
    name: "acceptedAnswers",
    control,
  })

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <Label className="flex flex-col gap-10">
        <h3 className="text-4xl">New question</h3>
        <Input placeholder="Type in new question" {...register("text")} />
      </Label>

      <section className="flex flex-col gap-4">
        <h4 className="text-2xl">Type accepted answers</h4>
        <ul className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <li key={field.id} className="flex gap-4">
              <Input
                placeholder="Accepted answer"
                {...register(`acceptedAnswers.${index}`)}
              />
              <Button type="button" onClick={() => remove(index)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          className="w-50"
          onClick={() => append({ answerText: "" })}
        >
          Add one more answer
        </Button>
      </section>

      <Input className={buttonVariants({ variant: "default" })} type="submit" />
    </form>
  )
}
