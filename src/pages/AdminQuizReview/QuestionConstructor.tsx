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
import { useDeleteQuestion } from './api/useDeleteQuestion'

type Props = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  selectedQuestion: { id: string; number: number }
  setSelectedQuestion: React.Dispatch<
    React.SetStateAction<
      | {
          id: string
          number: number
        }
      | undefined
    >
  >
  gameId: string
}

const defaultValues: Pick<Question, 'text'> & {
  answers: { answerText: string }[]
  id?: string
  img?: string
} = {
  text: '',
  img: '',
  answers: [{ answerText: '' }],
}

export function QuestionConstructor({
  selectedQuestion,
  gameId,
  setSelectedQuestion,
  ...props
}: Props) {
  const { mutate: updateQuestion } = usePatchUpdateQuestion()
  const { mutate: updateAcceptedAnswers } = usePutUpdateAcceptedAnswers(
    selectedQuestion.id
  )

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<typeof defaultValues>({
    defaultValues,
  })

  const imageUrl = watch('img')

  const { data: question } = useGetSingleQuestion(
    selectedQuestion.id,
    (question: Question) => ({
      text: question.text,
      img: question.img ? question.img : '',
    })
  )

  const { data: answers } = useGetAcceptedAnswersByQuestionId(
    selectedQuestion.id
  )

  const { mutate: deleteQuestion } = useDeleteQuestion(() => {})

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

  const onSubmit: SubmitHandler<typeof defaultValues> = ({
    answers,
    text,
    img,
  }) => {
    if (!answers.length) {
      setError('answers', {
        type: 'required',
        message: 'There should be at least one correct answer',
      })
      return
    }

    updateQuestion({
      gameId,
      id: selectedQuestion.id,
      img: img || null,
      text,
    })
    updateAcceptedAnswers(
      answers.map(({ answerText }) => ({
        questionId: selectedQuestion.id,
        text: answerText,
      }))
    )
  }

  const handleDelete = () => {
    deleteQuestion(selectedQuestion.id)
    setSelectedQuestion(undefined)
  }

  return (
    <div>
      <form {...props} onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-4xl mt-4">Question #{selectedQuestion.number}</h3>
        <Input placeholder="Insert image url" {...register('img')} />

        {imageUrl && <img className="mx-auto" width={400} src={imageUrl} />}

        <Label className="flex flex-col">
          <Input
            placeholder="Type in question text"
            {...register('text', { required: 'Question text must present' })}
          />
          {errors.text && (
            <p className="self-start text-red-400">{errors.text.message}</p>
          )}
        </Label>

        <section className="flex flex-col gap-4">
          <h4 className="text-2xl">Type accepted answers</h4>

          {errors.answers?.message && (
            <p className="text-red-400">{errors.answers.message}</p>
          )}

          <ul className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <li key={field.id} className="flex gap-4">
                <Label className="flex flex-col">
                  <Input
                    placeholder="Accepted answer"
                    {...register(`answers.${index}.answerText`, {
                      required: 'Empty answer is not accepted',
                    })}
                  />
                  {errors.answers && errors.answers[index] && (
                    <p className="self-start text-red-400">
                      {errors.answers[index]?.answerText?.message}
                    </p>
                  )}
                </Label>

                <Button type="button" onClick={() => remove(index)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            className="w-50"
            onClick={() => {
              clearErrors('answers')
              append({ answerText: '' })
            }}
          >
            Add one more answer
          </Button>
        </section>

        <Button
          className={buttonVariants({ variant: 'default' })}
          type="submit"
        >
          Add (update) question to the Quiz
        </Button>
      </form>

      <Button onClick={handleDelete} className="mt-4">
        Delete question
      </Button>
    </div>
  )
}
