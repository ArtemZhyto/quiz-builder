type Props = {
  params: Promise<{ quizID: string }>
}

const Quiz = async ({ params }: Props) => {
  const { quizID } = await params

  return <div>Quiz #{quizID}</div>
}

export default Quiz
