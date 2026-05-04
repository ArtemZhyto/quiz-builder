export const log = {
  info: (...args: any[]) => console.log('[INFO]', ...args),
  warn: (...args: any[]) => console.log('[WARN]', ...args),
  error: (...args: any[]) => console.log('[ERROR]', ...args),
}
