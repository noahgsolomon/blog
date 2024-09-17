import '@/globals.css'
import localFont from 'next/font/local'
import { cn } from './lib/utils'
import { Metadata } from 'next'
import Providers from './providers'

const jetbrains = localFont({ src: '../public/JetBrainsMonoNerdFontMono-Regular.ttf' })

export const metadata: Metadata = {
  title: 'Noah Solomon Blog',
  description: 'I talk about cool concepts and algorithms in ML',
  keywords: ['machine learning', 'algorithms', 'cs', 'zig', 'python', 'programming'],
  publisher: 'Noah Solomon',
  creator: 'Noah Solomon',
  authors: [{ name: 'Noah Solomon', url: 'https://x.com/noahgsolomon' }],
  alternates: {
    languages: {
      en: '/',
    },
  },
  metadataBase: new URL('https://noahgsolomon.com'),
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={cn('antialiased', jetbrains.className)} suppressHydrationWarning>
      <head />
      <Providers>
        <body className='dark flex flex-col h-[80vh] sm:min-h-screen'>{children}</body>
      </Providers>
    </html>
  )
}
