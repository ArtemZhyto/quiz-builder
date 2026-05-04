import { Request, Response } from 'express'

import PRISMA from '@src/prisma'

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await PRISMA.quiz.delete({
      where: { id: id as string },
    })

    return res.json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to delete quiz' })
  }
}
