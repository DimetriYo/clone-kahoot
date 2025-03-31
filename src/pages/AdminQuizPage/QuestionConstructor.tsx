import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DetailedHTMLProps, FormHTMLAttributes, useEffect } from 'react'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { getQuestionById } from './api/getQuestionById'
import { Question } from '@/types/question'
import { patchUpdateQuestion } from './api/patchUpdateQuestion'
import { postNewQuestion } from './api/postNewQuestion'

type Props = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & { selecteQuestionId?: string; gameId: string }

const defaultValues: Pick<Question, 'text'> & {
  answers: { answerText: string }[]
  id?: string
  img?: string
} = {
  text: '',
  answers: [{ answerText: '' }],
}

export function QuestionConstructor({
  selecteQuestionId,
  gameId,
  ...props
}: Props) {
  const { register, handleSubmit, control, reset } = useForm<
    typeof defaultValues
  >({
    defaultValues,
  })

  useEffect(() => {
    if (selecteQuestionId) {
      const newQuestion = getQuestionById(selecteQuestionId)

      if (!newQuestion) {
        return
      }

      const normalizedQuestion: typeof defaultValues = {
        answers: newQuestion.acceptedAnswers.map((answer) => ({
          answerText: answer,
        })),
        text: newQuestion.text,
      }

      reset(normalizedQuestion)
    } else {
      reset(defaultValues)
    }
  }, [selecteQuestionId])

  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    if (selecteQuestionId) {
      patchUpdateQuestion({
        acceptedAnswers: data.answers.map(({ answerText }) => answerText),
        id: selecteQuestionId,
        text: data.text,
      })
    } else {
      postNewQuestion({
        acceptedAnswers: data.answers.map(({ answerText }) => answerText),
        gameId,
        text: data.text,
        img: data.img,
      })
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  })

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <Label className="flex flex-col gap-10">
        <h3 className="text-4xl">New question</h3>
        <Input placeholder="Type in new question" {...register('text')} />
      </Label>

      <section className="flex flex-col gap-4">
        <h4 className="text-2xl">Type accepted answers</h4>
        <ul className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <li key={field.id} className="flex gap-4">
              <Input
                placeholder="Accepted answer"
                {...register(`answers.${index}.answerText`)}
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
          onClick={() => append({ answerText: '' })}
        >
          Add one more answer
        </Button>
      </section>

      <Input className={buttonVariants({ variant: 'default' })} type="submit" />
    </form>
  )
}
