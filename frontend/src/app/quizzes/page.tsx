'use client'

import { useEffect, useState } from 'react'
import { getQuizzes, deleteQuiz } from '@utils/api'
import Link from 'next/link'

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const data = await getQuizzes()
      setQuizzes(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) {
    return (
      <div className='min-h-[80vh] flex flex-col items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black mb-4'></div>
        <p className='text-gray-500 font-medium'>Loading quizzes...</p>
      </div>
    )
  }

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Quizzes</h1>
        <Link
          href='/create'
          className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition'
        >
          Create
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className='text-center py-20 border-2 border-dashed rounded-xl'>
          <p className='text-gray-500'>No quizzes yet. Create your first one!</p>
        </div>
      ) : (
        quizzes.map((q) => (
          <div
            key={q.id}
            className='border rounded-xl p-4 flex justify-between items-center hover:shadow-sm transition'
          >
            <Link href={`/quizzes/${String(q.id)}`} className='flex-1'>
              <h3 className='font-semibold'>{q.title}</h3>
              <p className='text-sm text-gray-500'>{q._count?.questions || 0} questions</p>
            </Link>
            <button
              onClick={async () => {
                if (confirm('Delete?')) {
                  await deleteQuiz(q.id)
                  load()
                }
              }}
              className='text-red-500 px-3 py-1 hover:bg-red-50 rounded-md transition'
            >
              delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}
