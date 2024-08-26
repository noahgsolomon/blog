import { Layout } from '@/components/dom/Layout'
import '@/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Noah Solomon Blog',
    default: 'Motivation Behind PPO Algorithm. Noah Solomon Blog',
  },
  description: 'What came before Proximal Policy Optimization, and why did PPO come to be in the first place?',
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
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className='dark'>
        <Layout>{children}</Layout>
        <Toaster duration={2000} richColors />
      </body>
    </html>
  )
}
