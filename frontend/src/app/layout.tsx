import './global.css'
import Link from 'next/link'

export const metadata = {
  title: 'Quiz Builder',
  description: 'Create and manage your quizzes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-gray-50 min-h-screen'>
        <nav className='bg-white border-b sticky top-0 z-10'>
          <div className='max-w-4xl mx-auto px-6 h-16 flex items-center justify-between'>
            <Link href='/quizzes' className='font-bold text-xl tracking-tight'>
              QUIZ<span className='text-blue-600'>BUILDER</span>
            </Link>
            <div className='flex gap-6 text-sm font-medium'>
              <Link href='/quizzes' className='hover:text-blue-600 transition'>
                All Quizzes
              </Link>
              <Link href='/create' className='hover:text-blue-600 transition'>
                Create New
              </Link>
            </div>
          </div>
        </nav>
        <main className='py-8'>{children}</main>
      </body>
    </html>
  )
}
