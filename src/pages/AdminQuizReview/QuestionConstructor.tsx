import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DetailedHTMLProps, FormHTMLAttributes, useEffect } from 'react'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { Question } from '@/types/question'
import { useGetSingleQuestion } from './api/useGetSingleQuestion'
import { usePatchUpdateQuestion } from './api/usePatchUpdateQuestion'
import { useGetAcceptedAnswersByQuestionId } from './api/useGetAcceptedAnswersByQuestionId'
import { usePutUpdateAcceptedAnswers } from './api/usePutUpdateAcceptedAnswers'

type Props = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & { selectedQuestion: { id: string; number: number }; gameId: string }

const defaultValues: Pick<Question, 'text'> & {
  answers: { answerText: string }[]
  id?: string
  img?: string
} = {
  text: '',
  answers: [{ answerText: '' }],
}

export function QuestionConstructor({
  selectedQuestion,
  gameId,
  ...props
}: Props) {
  const { mutate: updateQuestion } = usePatchUpdateQuestion()
  const { mutate: updateAcceptedAnswers } = usePutUpdateAcceptedAnswers(
    selectedQuestion.id
  )

  const { register, handleSubmit, control, reset } = useForm<
    typeof defaultValues
  >({
    defaultValues,
  })

  const { data: question } = useGetSingleQuestion(
    selectedQuestion.id,
    (question: Question) => ({
      text: question.text,
    })
  )

  const { data: answers } = useGetAcceptedAnswersByQuestionId(
    selectedQuestion.id
  )

  useEffect(() => {
    if (question && answers) {
      reset({
        ...question,
        answers: answers.map(({ text }) => ({ answerText: text })),
      })
    }
  }, [question, answers])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  })

  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    updateQuestion({
      gameId,
      id: selectedQuestion.id,
      text: data.text,
    })
    updateAcceptedAnswers(
      data.answers.map(({ answerText }) => ({
        questionId: selectedQuestion.id,
        text: answerText,
      }))
    )
  }

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)}>
      <Label className="flex flex-col gap-10">
        <h3 className="text-4xl">Question #{selectedQuestion.number}</h3>
        <Input placeholder="Type in new question" {...register('text')} />
      </Label>

      <section className="flex flex-col gap-4">
        <h4 className="text-2xl">Type accepted answers</h4>
        <ul className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <li key={field.id} className="flex gap-4">
              <Input
                placeholder="Accepted answer"
                {...register(`answers.${index}.answerText`, { required: true })}
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

      <Button className={buttonVariants({ variant: 'default' })} type="submit">
        Add (update) question to the Quiz
      </Button>
    </form>
  )
}
