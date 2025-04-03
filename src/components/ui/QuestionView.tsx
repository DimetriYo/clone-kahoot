import { Question } from "@/types/question"

export function QuestionView({ text, img }: Pick<Question, "img" | "text">) {
  return img ? (
    <figure className="flex flex-col items-center gap-4 rounded-lg">
      <img
        className="flex flex-col items-center gap-4 rounded-lg"
        src={img}
        alt={`Image illustrating the question: ${text}`}
      />
      <figcaption className="font-bold text-4xl">{text}</figcaption>
    </figure>
  ) : (
    <p>{text}</p>
  )
}
