import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

type UserAnswer = { answer: string }
const defaultValues = { answer: '' }

export function Player() {
  const { image, text } = {
    image:
      'https://assets.weforum.org/article/image/responsive_large_0ZUBmNNVLRCfn3NdU55nQ00UF64m2ObtcDS0grx02fA.jpg',
    text: 'What is good? And what is bad?',
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
      {image ? (
        <figure className="flex flex-col items-center gap-4 rounded-lg">
          <img
            className="flex flex-col items-center gap-4 rounded-lg"
            src={image}
            alt={`Image illustrating the question: ${text}`}
          />
          <figcaption className="font-bold text-4xl">{text}</figcaption>
        </figure>
      ) : (
        <p>{text}</p>
      )}
      <Input
        placeholder="Type your answer here!"
        disabled={isSubmitted}
        {...register('answer')}
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
