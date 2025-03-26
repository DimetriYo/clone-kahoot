import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Player() {
  const { image, text } = {
    image: null,
    // 'https://assets.weforum.org/article/image/responsive_large_0ZUBmNNVLRCfn3NdU55nQ00UF64m2ObtcDS0grx02fA.jpg',
    text: 'What is good? And what is bad?',
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {image ? (
        <figure className="flex flex-col items-center gap-4 rounded-lg">
          <img
            className="flex flex-col items-center gap-4 rounded-lg"
            src={image}
            alt={`Image illustrating the question: ${text}`}
          />
          <figcaption>{text}</figcaption>
        </figure>
      ) : (
        <p>{text}</p>
      )}
      <Input name={'answer'} type="text" />
      <Button>Send</Button>
    </div>
  )
}
