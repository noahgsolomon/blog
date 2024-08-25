'use client'

import { Toaster } from '@/components/ui/sonner'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'always',
    })
  }
  return (
    <>
      <PostHogProvider client={posthog}> {children}</PostHogProvider>
      <Toaster richColors position='top-center' visibleToasts={1} duration={2000} />
    </>
  )
}

export default Providers
