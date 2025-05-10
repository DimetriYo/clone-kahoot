import ImgWithPlaceholder from "@/components/ui/ImgWithPlaceholder"
import { Question } from "@/types/question"

export function QuestionView({ text, img }: Pick<Question, "img" | "text">) {
  if (!img) return null

  return (
    <>
      <ImgWithPlaceholder
        className="flex flex-col items-center gap-4 rounded-lg"
        src={img}
        alt={`Image illustrating the question: ${text}`}
      />
      <p className="font-bold text-4xl">{text}</p>
    </>
  )
}
