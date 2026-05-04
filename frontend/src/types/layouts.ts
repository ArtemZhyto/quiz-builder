// Types
import { LocalesT } from './locales'

export interface LayoutT {
  children: React.ReactNode
}

export interface LocalesLayoutT {
  children: React.ReactNode
  params: Promise<{ locale: LocalesT }>
}
