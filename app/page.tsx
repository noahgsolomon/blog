'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { config } from '@react-spring/three'
import { animated, useSpring, config as webConfig } from '@react-spring/web'
import { PerspectiveCamera, PresentationControls } from '@react-three/drei'
import { ArrowLeft, ArrowRight, Github, Info, Rabbit, Zap } from 'lucide-react'
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

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='w-screen h-screen'>
      <div className='flex flex-col  gap-24 px-24 max-w-[800px] mx-auto items-center justify-center w-full'>
        <Navbar />
        <div className='pt-48 flex flex-col gap-2'>
          <p className='text-xl'>
            Sup I'm{' '}
            <HoverCard openDelay={0} closeDelay={100}>
              <HoverCardTrigger className='text-xl underline cursor-pointer'>Noah</HoverCardTrigger>
              <HoverCardContent className='w-[200px] h-[200px] bg-transparent shadow-none border-none'>
                <Image
                  className='rounded-lg border h-full w-full'
                  width={200}
                  height={200}
                  src={'/sam.png'}
                  alt='sam hyde'
                />
              </HoverCardContent>
            </HoverCard>
            , and this is my blog.{' '}
            <span className='text-primary/80'>
              {' '}
              I like to talk about{' '}
              <HoverCard openDelay={0} closeDelay={100}>
                <HoverCardTrigger className='text-xl underline cursor-pointer'>machine learning</HoverCardTrigger>
                <HoverCardContent className='w-[200px] h-[200px] bg-transparent shadow-none border-none'>
                  <Image
                    className='rounded-lg border h-full w-full'
                    width={200}
                    height={200}
                    src={'/yann.jpeg'}
                    alt='yann lecun'
                  />
                </HoverCardContent>
              </HoverCard>{' '}
              concepts and present them in a digestible and simple way.
            </span>
          </p>
          <div className='flex flex-row gap-2'>
            <Link
              target='_blank'
              className={buttonVariants({ variant: 'secondary' })}
              href={'https://noahgsolomon.com'}
            >
              About Me
            </Link>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4'>
          <p className='text-3xl'>Featured Lessons</p>
          <div className='relative h-80 w-full rounded-lg border'>
            <View className='rounded-lg touch-none w-full h-full'>
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
            {gameState.state === 'LOADING' ? (
              <p className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center gap-2 z-10'>
                Loading <Rabbit className='size-4' />
              </p>
            ) : (
              <animated.div
                style={initialAnimation}
                className='absolute top-4 text-center left-0 right-0 flex flex-col gap-2 z-10'
              >
                <p className='font-bold text-xl'>Proximal Policy Optimization</p>
                <div>
                  <Button size='sm'>Learn Now</Button>
                </div>
              </animated.div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
