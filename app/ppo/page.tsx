'use client'

import { Html, OrbitControls, PerspectiveCamera, PresentationControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import Lights from '@/Lights'
import PPO from './PPO'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { Button, buttonVariants } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import rehypeRaw from 'rehype-raw'
import ThemeButton from '@/components/ThemeButton'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react'
import Markdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import { CHECKPOINTS } from './Checkpoints'
import usePlayStore from './store/PlayStore'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
})

CameraControls.install({ THREE: THREE })

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3(), chapterNumber }) {
  const lookOffset = useMemo(() => structuredClone(look), [look])
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 2) : pos.set(0, 0, 5)
    const targetLook = zoom
      ? new THREE.Vector3(focus.x + lookOffset.x, focus.y + lookOffset.y, focus.z - 2 + lookOffset.z)
      : new THREE.Vector3(0, 0, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      targetLook.x,
      targetLook.y,
      targetLook.z,
      true,
    )
    return controls.update(delta)
  })
}

export default function Page() {
  const { currentPosition, focus, look, setCurrentPosition, setFocus, setLook, setCurrentPlayPosition } = usePlayStore()

  const [isMounted, setIsMounted] = useState(false)
  const [zoom, setZoom] = useState(false)

  const [markdownIdx, setMarkdownIdx] = useState(0)

  const markdownContainerRef = useRef(null)

  useEffect(() => {
    setZoom(true)
    setFocus(new THREE.Vector3(...CHECKPOINTS[0].position))
    setLook(new THREE.Vector3(...CHECKPOINTS[0].look))
    setIsMounted(true)
  }, [])

  useEffect(() => {
    console.log(look)
  }, [look])

  if (!isMounted) {
    return null
  }

  return (
    <div className='w-screen h-[90vh] fine:h-screen overflow-hidden flex flex-col lg:flex-row'>
      <div className='w-full lg:w-[60%] lg:h-full h-[50%] relative'>
        <View className=' touch-none w-full h-full '>
          <PPO />
          <Lights />
          {/* <OrbitControls /> */}
          <Controls look={look} zoom={zoom} focus={focus} chapterNumber={currentPosition % CHECKPOINTS.length} />
        </View>
        <ThemeButton className='z-20 absolute top-4 right-4' />
      </div>

      <div className='flex border-t lg:border-l shadow-md p-4 z-10 bg-card w-full lg:w-[40%] flex-col lg:gap-4 h-[50%] lg:h-full overflow-y-hidden'>
        <div className='flex flex-col h-full'>
          <div
            ref={markdownContainerRef}
            className='bg-popover h-[80%] lg:h-[750px] shadow-inner overflow-y-auto overflow-x-hidden border rounded-lg p-4 relative z-0'
          >
            {/* <div className='absolute bg-white/[7.5%] -top-4  -left-[16px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#f9fb00]/[7.5%] -top-4  left-[34px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#02feff]/[7.5%]  -top-4  left-[84px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#01ff00]/[7.5%] -top-4  left-[134px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#fd00fb]/[7.5%]  -top-4  left-[184px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#fb0102]/[7.5%]  -top-4  left-[234px] h-[110%] w-[50px]' />
            <div className='absolute bg-[#0301fc]/[7.5%] -top-4  left-[284px] h-[110%] w-[50px]' />
            <div className='absolute bg-black/[7.5%] -top-4  left-[334px] h-full w-[50px]' /> */}
            <Markdown
              className='z-10 relative'
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeRaw]}
            >
              {CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown[markdownIdx]}
            </Markdown>
          </div>

          <div className='flex flex-col gap-1 lg:gap-4'>
            <div className='flex w-full justify-center gap-4 pt-1 lg:pt-4 items-center'>
              <Button
                variant='outline'
                size='icon'
                className='size-6'
                disabled={markdownIdx <= 0}
                onClick={() => {
                  setMarkdownIdx((prev) => prev - 1)
                  markdownContainerRef.current?.firstElementChild?.scrollIntoView()
                }}
              >
                <ArrowLeft className='size-4' />
              </Button>
              <p className='font-bold text-xl'>
                {[
                  ...Array.from({ length: CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown.length }).map(
                    (_, index) =>
                      index === markdownIdx ? (
                        <span key={index} className='text-blue-500'>
                          .
                        </span>
                      ) : index < markdownIdx ? (
                        <span key={index} className=' text-green-500'>
                          .
                        </span>
                      ) : (
                        <Fragment key={index}>.</Fragment>
                      ),
                  ),
                ]}
              </p>
              <Button
                size='icon'
                variant='outline'
                className='size-6'
                disabled={markdownIdx >= CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown.length - 1}
                onClick={() => {
                  setMarkdownIdx((prev) => prev + 1)
                  markdownContainerRef.current?.firstElementChild?.scrollIntoView()
                }}
              >
                <ArrowRight className='size-4' />
              </Button>
            </div>

            <div className='w-full flex flex-row gap-1'>
              <Button
                disabled={currentPosition === 0}
                size='sm'
                variant='outline'
                className='w-[20%]'
                onClick={() => {
                  setFocus(new THREE.Vector3(...CHECKPOINTS[(currentPosition - 1) % CHECKPOINTS.length].position))
                  setLook(new THREE.Vector3(...CHECKPOINTS[(currentPosition - 1) % CHECKPOINTS.length].look))

                  setCurrentPosition(currentPosition - 1)
                  setMarkdownIdx(0)
                  markdownContainerRef.current?.firstElementChild?.scrollIntoView()
                  setCurrentPlayPosition(-1)
                }}
              >
                Back
              </Button>

              <Button
                className='w-[80%]'
                size='sm'
                disabled={markdownIdx < CHECKPOINTS[currentPosition % CHECKPOINTS.length].markdown.length - 1}
                onClick={() => {
                  setFocus(new THREE.Vector3(...CHECKPOINTS[(currentPosition + 1) % CHECKPOINTS.length].position))
                  setLook(new THREE.Vector3(...CHECKPOINTS[(currentPosition + 1) % CHECKPOINTS.length].look))

                  setCurrentPosition(currentPosition + 1)
                  setMarkdownIdx(0)
                  markdownContainerRef.current?.firstElementChild?.scrollIntoView()
                  setCurrentPlayPosition(-1)
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Link className={buttonVariants({ variant: 'outline', className: 'absolute top-4 left-4 z-20' })} href={'/'}>
        <ChevronLeft className='size-4' />
      </Link>
      <h1 className='text-xl lg:text-2xl absolute z-20 top-12 left-1/2 lg:left-1/3 transform -translate-x-1/2 font-bold'>
        {currentPosition % CHECKPOINTS.length}. {CHECKPOINTS[currentPosition % CHECKPOINTS.length].chapterName}
      </h1>
      <Accordion
        className='hidden lg:block shadow-md bg-card rounded-lg transition-all cursor-pointer z-20 absolute bottom-4 left-4'
        type='single'
        collapsible
      >
        <AccordionItem className='rounded-lg border px-4 py-1' value='item-1'>
          <AccordionTrigger>
            <div className='flex flex-col gap-1'>
              <p className='text-yellow-300 font-thin text-xs md:text-sm'>
                CHAPTER {currentPosition % CHECKPOINTS.length}
              </p>
              <p className='font-thin text-xs md:text-sm text-left'>
                {CHECKPOINTS[currentPosition % CHECKPOINTS.length].chapterName}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2'>
            {CHECKPOINTS.map((checkpoint, index) => (
              <AccordionItem
                onClick={() => {
                  setFocus(new THREE.Vector3(...CHECKPOINTS[index % CHECKPOINTS.length].position))
                  setLook(new THREE.Vector3(...CHECKPOINTS[index % CHECKPOINTS.length].look))
                  setCurrentPosition(index)
                  setMarkdownIdx(0)
                }}
                key={index}
                className='group'
                value='chapter-1'
              >
                <div className='flex flex-col'>
                  <p
                    className={`${index === currentPosition ? 'text-yellow-300' : ''} group-hover:text-blue-500 transition-all font-thin text-primary/70 text-[8px] md:text-[10px]`}
                  >
                    CHAPTER {index}
                  </p>
                  <p className='font-thin text-xs md:text-sm'>{checkpoint.chapterName}</p>
                </div>
              </AccordionItem>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
