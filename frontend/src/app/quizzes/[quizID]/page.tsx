import { getQuiz } from '@utils/api'
import Link from 'next/link'

export default async function QuizPage({ params }: { params: Promise<{ quizID: string }> }) {
  const resolvedParams = await params

  const id = resolvedParams?.quizID

  if (!id || id === 'undefined') {
    return (
      <div className='p-10 text-center'>
        <h1 className='text-red-500 font-bold'>Invalid ID in URL</h1>
        <p className='text-gray-500'>ID получен как: "{String(id)}"</p>
        <p className='text-xs mt-4'>
          Проверь папку: она должна называться <code className='bg-gray-100'>[id]</code> (в скобках)
        </p>
        <Link href='/quizzes' className='text-blue-500 underline'>
          Return to list
        </Link>
      </div>
    )
  }

  try {
    const quiz = await getQuiz(id)

    if (!quiz) {
      return (
        <div className='p-10 text-center'>
          <p>Quiz not found in Database.</p>
          <Link href='/quizzes' className='text-blue-500'>
            Return to list
          </Link>
        </div>
      )
    }

    return (
      <div className='max-w-2xl mx-auto p-6'>
        <script
          dangerouslySetInnerHTML={{ __html: `console.log("Client-side ID check:", "${id}")` }}
        />

        <Link href='/quizzes' className='text-sm text-gray-500'>
          ← Back
        </Link>
        <h1 className='text-3xl font-bold mt-4 mb-8'>{quiz.title}</h1>

        <div className='space-y-6'>
          {quiz.questions?.map((q: any, i: number) => (
            <div key={i} className='bg-gray-50 p-6 rounded-xl border'>
              <p className='font-medium text-lg'>
                {i + 1}. {q.question}
              </p>
              <div className='mt-4 ml-4 space-y-2'>
                {q.type === 'checkbox' &&
                  q.options?.map((opt: string, idx: number) => (
                    <label key={idx} className='flex items-center gap-2'>
                      <input type='checkbox' disabled className='rounded' /> {opt}
                    </label>
                  ))}
                {q.type === 'boolean' &&
                  ['True', 'False'].map((opt) => (
                    <label key={opt} className='flex items-center gap-2'>
                      <input type='radio' disabled /> {opt}
                    </label>
                  ))}
                {q.type === 'input' && (
                  <input disabled className='border p-2 w-full rounded' placeholder='Text answer' />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (err: any) {
    return (
      <div className='p-10 text-center text-red-500'>
        <p>Failed to load quiz data.</p>
        <p className='text-xs text-gray-400'>{err.message}</p>
      </div>
    )
  }
}
