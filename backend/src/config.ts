import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(process.cwd(), './docker/.env') })

const isProd = process.env.MODE === 'prod'

export const __PORT = process.env.PORT || 5000

export const cookieOptions = {
  httpOnly: true,
  sameSite: (isProd ? 'strict' : 'lax') as 'strict' | 'lax',
  secure: isProd,
}
