'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Providers from '@/lib/Providers'
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const ref = useRef()

  return (
    <div
      ref={ref}
      className='bg-background text-foreground'
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
      }}
    >
      <Providers>
        {children}
        <Scene
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
          }}
          eventSource={ref}
          eventPrefix='client'
        />
      </Providers>
    </div>
  )
}

export { Layout }
