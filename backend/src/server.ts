// Configs
import { __PORT, CORS_OPTIONS, HELMET_OPTIONS } from './config'

import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'

import router from '@routes/router'

const app = express()

app.set('trust proxy', 1)
app.use(cors(CORS_OPTIONS))
app.use(cookieParser())
app.use(helmet(HELMET_OPTIONS))
app.use(express.json())
app.use(cookieParser())

app.use('/', router)

app.use((req, res) => {
  res.sendStatus(404)
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(500)
})

app.listen(__PORT, () => {
  console.log(`Backend started on :${__PORT}`)
})
