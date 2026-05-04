import { Request, Response } from 'express'
import { z } from 'zod'
import PRISMA from '@src/prisma'

const quizSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  questions: z
    .array(
      z.object({
        type: z.enum(['input', 'boolean', 'checkbox']),
        question: z.string().min(1, 'Question text is required'),
        options: z.array(z.string()).optional().default([]),
      }),
    )
    .min(1, 'At least one question is required'),
})

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const validatedData = quizSchema.parse(req.body)

    const quiz = await PRISMA.quiz.create({
      data: {
        title: validatedData.title,
        questions: {
          create: validatedData.questions.map((q) => ({
            type: q.type,
            question: q.question,
            options: q.options,
          })),
        },
      },
      include: { questions: true },
    })

    return res.status(201).json(quiz)
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: err.issues,
      })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
