'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-6 text-center'>
      <h1 className='text-9xl font-black text-gray-200'>404</h1>
      <div className='-mt-10'>
        <h2 className='text-2xl font-bold mb-2'>Page Not Found</h2>
        <p className='text-gray-500 mb-8'>Oops! The page you are looking for doesn't exist.</p>
        <Link
          href='/quizzes'
          className='bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition'
        >
          Back to Quizzes
        </Link>
      </div>
    </div>
  )
}
