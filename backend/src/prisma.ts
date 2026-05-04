import { PrismaClient } from '../prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const PRISMA = new PrismaClient({
  adapter: adapter,
})

export default PRISMA
