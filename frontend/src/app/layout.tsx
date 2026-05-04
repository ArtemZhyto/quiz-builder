// Styles
import './global.css'

// Types
import { LocalesLayoutT } from '@shared-types/layouts'

const RootLayout = async ({ children }: LocalesLayoutT) => {
  return (
    <html lang='en-US'>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
