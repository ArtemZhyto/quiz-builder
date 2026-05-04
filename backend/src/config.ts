import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), './docker/.env') })

const isProd = process.env.MODE === 'prod'

export const __PORT = process.env.PORT

const originConfig = ['http://localhost:3000']

export const CORS_OPTIONS = {
  origin: originConfig,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'x-client-user-agent'],
  credentials: true,
}

export const HELMET_OPTIONS = {
  crossOriginResourcePolicy: {
    policy: 'cross-origin' as const,
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"],
    },
  },
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: (isProd ? 'strict' : 'lax') as 'strict' | 'lax',
  secure: isProd,
}
