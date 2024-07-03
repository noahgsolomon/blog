'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { config } from '@react-spring/three'
import { animated, useSpring, config as webConfig } from '@react-spring/web'
import { PerspectiveCamera, PresentationControls } from '@react-three/drei'
import { Box, Github, Linkedin, Rabbit } from 'lucide-react'
import dynamic from 'next/dynamic'
import Lights from './Lights'
import useGameState from './store/useGameState'
import { useEffect, useState } from 'react'
import LevelTwo from './LevelTwo'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Link from 'next/link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import Image from 'next/image'
import PPOImage from './ppo-image'
import { Tooltip, TooltipContent, TooltipTrigger } from './components/ui/tooltip'
import XIcon from './components/icons/XIcon'
import { Badge } from './components/ui/badge'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
})

export default function Page() {
  const gameState = useGameState()

  const initialAnimation = useSpring({
    opacity: gameState.state !== 'LOADING' ? 1 : 0,
    transform: gameState.state !== 'LOADING' ? 'translateY(0)' : 'translateY(25%)',
    config: webConfig.wobbly,
  })

  const [view3DPPO, setView3DPPO] = useState(false)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='w-screen h-screen'>
      <div className='flex flex-col  gap-24 md:px-24 px-4 max-w-[800px] mx-auto items-center justify-center w-full'>
        {/* <Navbar /> */}
        <div className='pt-24 flex flex-col gap-2'>
          <p className='text-lg'>
            Sup I'm <span className='underline'>Noah</span>.
            <span className=''>
              {' '}
              I like to talk about <span className='underline'>machine learning</span> concepts and present them in a
              digestible and simple way.
            </span>
          </p>
          <div className='flex flex-row gap-2'>
            <Link
              target='_blank'
              className={buttonVariants({ variant: 'secondary', size: 'sm' })}
              href={'https://noahgsolomon.com'}
            >
              About Me
            </Link>
            <Link
              target='_blank'
              href={'https://github.com/noahgsolomon'}
              className={buttonVariants({ variant: 'outline', size: 'sm', className: 'flex flex-row gap-2' })}
            >
              <Github className='size-4 fill-[#333]' />
            </Link>
            <Link
              target='_blank'
              href={'https://twitter.com/noahgsolomon'}
              className={buttonVariants({ variant: 'outline', size: 'sm', className: 'flex flex-row gap-2' })}
            >
              <XIcon className='size-4 fill-primary' />
            </Link>
            <Link
              target='_blank'
              href={'https://www.linkedin.com/in/noahgsolomon'}
              className={buttonVariants({ variant: 'outline', size: 'sm', className: 'flex flex-row gap-2' })}
            >
              <Linkedin className='size-4' />
            </Link>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4'>
          <p className=''>Articles</p>
          <div className='border flex flex-col gap-2 rounded-lg p-4'>
            <div className='flex flex-col gap-2 z-10'>
              <p className=' '>So what is superposition?</p>
              <p className='text-xs text-primary/60'>
                What is superposition, why it arises in neural networks, and interesting properties of positive and
                negative interference.
              </p>
              <div className='flex flex-row gap-2'>
                <Link href={'/ppo'} className={buttonVariants({ size: 'sm' })}>
                  Learn Now
                </Link>
              </div>
            </div>
          </div>
          <div className='border flex flex-col gap-2 rounded-lg p-4 relative'>
            <Badge variant='destructive' className='absolute -top-2 -right-2'>
              3D
            </Badge>
            <div className='flex flex-col gap-2 z-10'>
              <p className=' '>Proximal Policy Optimization</p>
              <p className='text-xs text-primary/60'>
                Top down demonstration of PPO, and what pain points algorithms before it faced that PPO aims to fix.
              </p>
              <div className='flex flex-row gap-2'>
                <Link href={'/ppo'} className={buttonVariants({ size: 'sm' })}>
                  Learn Now
                </Link>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => setView3DPPO(true)} variant='outline' size='sm'>
                      <Box className='size-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View the 3D model of PPO in action.</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div className='relative h-80 w-full rounded-lg border overflow-hidden'>
              {!view3DPPO ? (
                <PPOImage />
              ) : (
                <>
                  <View className='touch-none w-full h-full '>
                    <PresentationControls
                      enabled
                      global
                      cursor={false}
                      speed={1}
                      zoom={1}
                      rotation={[Math.PI * 0.175, 0, 0]}
                      polar={[-Math.PI / 16, Math.PI / 3]}
                      azimuth={[-Infinity, Infinity]}
                      config={config.slow}
                    >
                      {<LevelTwo />}
                    </PresentationControls>
                    <Lights />
                    <PerspectiveCamera makeDefault position={[0, 0, 25]} />
                  </View>
                  {gameState.state === 'LOADING' && (
                    <p className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center gap-2 z-10'>
                      Loading <Rabbit className='size-4' />
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  )
}
