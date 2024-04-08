import { Layout } from '@/components/dom/Layout'
import '@/globals.css'
import localFont from 'next/font/local'
import { cn } from './lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { Metadata } from 'next'

const krypton = localFont({ src: '../public/krypton.otf' })

export const metadata: Metadata = {
  title: 'Noah Solomon Blog',
  description: 'I talk about cool concepts and algorithms in ML',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={cn('antialiased', krypton.className)} suppressHydrationWarning>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Layout>{children}</Layout>
        <Toaster duration={2000} richColors />
      </body>
    </html>
  )
}
