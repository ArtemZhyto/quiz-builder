// Configs
import { __PORT } from './config'

// Modules
import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'

// Router
import router from '@routes/router'

const app = express()

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
