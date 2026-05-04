import { Request, Response } from 'express'

import PRISMA from '@src/prisma'

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body

    const quiz = await PRISMA.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q: any) => ({
            type: q.type,
            question: q.question,
            options: q.options || [],
          })),
        },
      },
      include: {
        questions: true,
      },
    })

    res.status(201).json(quiz)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create quiz' })
  }
}
