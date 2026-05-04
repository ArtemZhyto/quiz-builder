'use client'

import { useState } from 'react'
import { createQuiz } from '@utils/api'
import { useRouter } from 'next/navigation'

type QuestionType = 'input' | 'boolean' | 'checkbox'

type Question = {
  id: string
  type: QuestionType
  question: string
  options: string[]
}

export default function CreatePage() {
  const router = useRouter() 
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])

  function addQuestion() {
    setQuestions([
      ...questions,
      {
        id: crypto.randomUUID(),
        type: 'input',
        question: '',
        options: [],
      },
    ])
  }

  function removeQuestion(id: string) {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  function updateQuestion(id: string, field: keyof Question, value: any) {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  function updateType(id: string, type: QuestionType) {
    setQuestions(
      questions.map((q) =>
        q.id === id
          ? {
              ...q,
              type,
              question: '',
              options: type === 'checkbox' ? [''] : [],
            }
          : q,
      ),
    )
  }

  function addOption(qId: string) {
    setQuestions(questions.map((q) => (q.id === qId ? { ...q, options: [...q.options, ''] } : q)))
  }

  function updateOption(qId: string, oIndex: number, value: string) {
    setQuestions(
      questions.map((q) => {
        if (q.id === qId) {
          const newOptions = [...q.options]
          newOptions[oIndex] = value
          return { ...q, options: newOptions }
        }
        return q
      }),
    )
  }

  function removeOption(qId: string, oIndex: number) {
    setQuestions(
      questions.map((q) =>
        q.id === qId
          ? {
              ...q,
              options: q.options.filter((_, i) => i !== oIndex),
            }
          : q,
      ),
    )
  }

  async function submit() {
    if (!title || questions.length === 0) return alert('Fill title and add questions')
    try {
      await createQuiz({ title, questions })
      router.push('/quizzes')
    } catch (err) {
      alert('Failed to save quiz')
    }
  }

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Create New Quiz</h1>

      <div className='space-y-2'>
        <label className='block text-sm font-medium'>Quiz Title</label>
        <input
          className='border p-2 w-full rounded focus:ring-2 focus:ring-black outline-none'
          placeholder='e.g. JavaScript Basics'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='space-y-4'>
        {questions.map((q) => (
          <div key={q.id} className='border rounded-lg p-4 space-y-3 bg-white shadow-sm'>
            <div className='flex justify-between gap-2'>
              <select
                value={q.type}
                onChange={(e) => updateType(q.id, e.target.value as QuestionType)}
                className='border p-1 rounded bg-gray-50'
              >
                <option value='input'>Text Input</option>
                <option value='boolean'>True/False</option>
                <option value='checkbox'>Multiple Choice</option>
              </select>
              <button
                onClick={() => removeQuestion(q.id)}
                className='text-red-500 hover:bg-red-50 px-2 rounded'
              >
                ✕
              </button>
            </div>

            <input
              className='border-b p-2 w-full focus:border-black outline-none'
              placeholder='Enter your question'
              value={q.question}
              onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
            />

            {q.type === 'boolean' && (
              <div className='flex gap-4 text-sm text-gray-400 italic py-2'>
                <span>(User will see True/False options)</span>
              </div>
            )}

            {q.type === 'checkbox' && (
              <div className='space-y-2 pl-4'>
                {q.options.map((opt, oi) => (
                  <div key={oi} className='flex gap-2'>
                    <input
                      className='border p-1 flex-1 rounded text-sm'
                      placeholder={`Option ${oi + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(q.id, oi, e.target.value)}
                    />
                    <button
                      onClick={() => removeOption(q.id, oi)}
                      className='text-gray-400 hover:text-red-500'
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type='button'
                  onClick={() => addOption(q.id)}
                  className='text-sm text-blue-600 font-medium'
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='flex gap-3 pt-4'>
        <button
          onClick={addQuestion}
          className='border border-black px-4 py-2 rounded hover:bg-gray-50 transition'
        >
          Add Question
        </button>
        <button
          onClick={submit}
          className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition'
        >
          Save Quiz
        </button>
      </div>
    </div>
  )
}
