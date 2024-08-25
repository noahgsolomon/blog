import { Layout } from '@/components/dom/Layout'
import '@/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Noah Solomon Blog',
  description: 'I talk about cool concepts and algorithms in ML',
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
