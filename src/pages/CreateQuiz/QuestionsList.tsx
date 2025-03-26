export function QuestionsList() {
  const { questions } = {
    questions: [
      {
        id: 'first-question-id-1',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp4l3_LB4YHI0h4B8Ji5ZQEY_LX81bCiZUtw&s',
        text: 'First question text 1',
      },
      {
        id: 'first-question-id-2',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0J6AzkjtM_ffly3RMZbbCvT1rnvy0UOmovA&s',
        text: 'Second question text 2',
      },
    ],
  }

  return (
    <aside>
      <h3>Questions</h3>

      <ul>
        {questions.map(({ id }, index) => (
          <li key={id}>Question number {index + 1}</li>
        ))}
      </ul>
    </aside>
  )
}
