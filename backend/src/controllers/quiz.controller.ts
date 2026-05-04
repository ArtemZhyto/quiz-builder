import { Request, Response } from 'express'

import PRISMA from '@src/prisma'

export const quiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const data = await PRISMA.quiz.findUnique({
      where: { id: id as string },
      include: {
        questions: true,
      },
    })

    if (!data) {
      return res.status(404).json({ error: 'Quiz not found' })
    }

    return res.json(data)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch quiz' })
  }
}
