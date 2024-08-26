import '@/globals.css'
import localFont from 'next/font/local'
import { cn } from './lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import Providers from './providers'

const jetbrains = localFont({ src: '../public/JetBrainsMonoNerdFontMono-Regular.ttf' })

export const metadata: Metadata = {
  title: 'Noah Solomon Blog',
  description: 'I talk about cool concepts and algorithms in ML',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={cn('antialiased', jetbrains.className)} suppressHydrationWarning>
      <head />
      <Providers>
        <body className='dark flex flex-col min-h-[75vh] sm:min-h-screen'>
          <div className='grow'>{children}</div>
          <footer className='w-full px-4'>
            <div className='flex flex-col items-center gap-2 max-w-[600px] mx-auto'>
              <div className='flex flex-row gap-4'>
                {/* Updated Link component with visited state */}
                <Link
                  target='_blank'
                  href={'https://github.com/noahgsolomon'}
                  className='underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] visited:text-[#8466aa]'
                >
                  github
                </Link>
                <Link
                  target='_blank'
                  href={'https://twitter.com/noahgsolomon'}
                  className='underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] visited:text-[#8466aa]'
                >
                  x.com
                </Link>
                <Link
                  target='_blank'
                  href={'https://www.linkedin.com/in/noahgsolomon'}
                  className='underline underline-offset-4 text-[#5692ae] hover:text-[#5692ae] visited:text-[#8466aa]'
                >
                  linkedin
                </Link>
              </div>
              <p className='text-primary/60'>© 2024 noahgsolomon</p>
            </div>
          </footer>
        </body>
      </Providers>
    </html>
  )
}
