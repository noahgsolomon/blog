'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from 'next-themes'
//@ts-ignore

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute='class'>
      <TooltipProvider delayDuration={0}>
        {/* <div className='fixed bottom-4 left-4 z-20 rounded-full border bg-primary/20'>
        {process.env.NEXT_PUBLIC_ENV === 'LOCAL' && <LagRadar />}
      </div> */}
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default Providers
