import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'

type QuizQuestion = { text: string; acceptedAnswers: { answerText: string }[] }

export function QuestionConstructor() {
  const { register, handleSubmit, control } = useForm<QuizQuestion>()
  const onSubmit: SubmitHandler<QuizQuestion> = (data) => console.log(data)

  const { fields, append, remove } = useFieldArray({
    name: 'acceptedAnswers',
    control,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('text')} />

      <ul>
        {fields.map((field, index) => (
          <li key={field.id}>
            {field.answerText}
            <Button onClick={() => remove(index)}>Remove</Button>
          </li>
        ))}
      </ul>
      <Button onClick={() => append({ answerText: '' })}>
        Add one more answer
      </Button>

      <input type="submit" />
    </form>
  )
}
