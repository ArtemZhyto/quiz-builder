import { Router } from 'express'

import { createQuiz } from '@controllers/createQuiz.controller'
import { quizzes } from '@controllers/quizzes.controller'
import { quiz } from '@controllers/quiz.controller'
import { deleteQuiz } from '@controllers/deleteQuiz.controller'

const router = Router()

router.post('/quizzes', createQuiz)
router.get('/quizzes', quizzes)
router.get('/quizzes/:id', quiz)
router.delete('/quizzes/:id', deleteQuiz)

export default router
