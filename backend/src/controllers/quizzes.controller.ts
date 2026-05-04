import { Request, Response } from 'express'

import PRISMA from '@src/prisma'

import { log } from '@services/logger'

export const quizzes = async (_req: Request, res: Response) => {
  try {
    const data = await PRISMA.quiz.findMany({
      select: {
        id: true,
        title: true,
        _count: {
          select: { questions: true },
        },
      },
    })

    return res.json(data)
  } catch (err: any) {
    return res.status(500).json({
      error: 'Failed to fetch quizzes',
      message: err?.message,
    })
  }
}
