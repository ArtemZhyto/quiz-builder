const API_URL = 'http://localhost:5000'

export async function getQuizzes() {
  const res = await fetch(`${API_URL}/quizzes`)

  if (!res.ok) throw new Error('Failed to fetch quizzes')

  return res.json()
}

export async function getQuiz(id: string) {
  const res = await fetch(`${API_URL}/quizzes/${id}`)

  if (!res.ok) throw new Error('Failed to fetch quiz')

  return res.json()
}

export async function createQuiz(data: { title: string; questions: any[] }) {
  const res = await fetch(`${API_URL}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || 'Failed to create quiz')
  }

  return res.json()
}

export async function deleteQuiz(id: string) {
  const res = await fetch(`${API_URL}/quizzes/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) throw new Error('Failed to delete quiz')

  return res.json()
}
