import ImgWithPlaceholder from '@/components/ui/ImgWithPlaceholder'
import { Question } from '@/types/Question'

export function QuestionView({ text, img }: Pick<Question, 'img' | 'text'>) {
  return (
    <>
      {img && (
        <ImgWithPlaceholder
          className="flex flex-col items-center gap-4 rounded-lg mx-auto"
          src={img}
          alt={`Image illustrating the question: ${text}`}
        />
      )}
      <p className="font-bold text-4xl">{text}</p>
    </>
  )
}
