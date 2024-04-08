'use client'

import { OrbitControls, PerspectiveCamera, PresentationControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import Lights from '@/Lights'
import PPO from './PPO'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
})

CameraControls.install({ THREE: THREE })

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 2) : pos.set(0, 0, 5)
    zoom ? look.set(focus.x, focus.y, focus.z - 2) : look.set(0, 0, 4)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      true,
    )
    return controls.update(delta)
  })
}

const POSITIONS = [
  [-2, 0, 0],
  [0, 0, 0],
  [2, 0, 0],
]

export default function Page() {
  const [isMounted, setIsMounted] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  const [currentPosition, setCurrentPosition] = useState(0)

  useEffect(() => {
    setZoom(true)
    setFocus(new THREE.Vector3(...POSITIONS[0]))
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <View className='touch-none w-full h-full '>
        <PPO zoomToView={(focusRef) => (setZoom(true), setFocus(focusRef))} />
        <Lights />
        <OrbitControls />
        <Controls zoom={zoom} focus={focus} />
      </View>
      <div className='absolute top-1/2 right-4 rounded-lg border p-4 bg-card z-10 max-w-[300px] flex flex-col gap-4'>
        <h2>explanation</h2>
        <p>here is an explanation modal yep</p>
        <Button
          onClick={() => {
            setFocus(new THREE.Vector3(...POSITIONS[(currentPosition + 1) % POSITIONS.length]))
            setCurrentPosition((prev) => prev + 1)
          }}
        >
          Continue
        </Button>
      </div>
      <Accordion
        className='bg-card rounded-lg transition-all cursor-pointer z-20 absolute bottom-4 left-4'
        type='single'
        collapsible
      >
        <AccordionItem className='rounded-lg border px-4 py-1' value='item-1'>
          <AccordionTrigger>
            <div className='flex flex-col gap-1'>
              <p className='text-yellow-300 font-thin text-xs'>CHAPTER 2</p>
              <p className='font-thin text-xs text-left'>Learn</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2'>
            <AccordionItem className='group' value='chapter-1'>
              <div className='flex flex-col'>
                <p className='group-hover:text-blue-500 transition-all font-thin text-primary/70 text-[8px]'>
                  CHAPTER 1
                </p>
                <p className='font-thin text-xs'>Learn</p>
              </div>
            </AccordionItem>
            <AccordionItem className='group' value='chapter-2'>
              <div className='flex flex-col'>
                <p className='group-hover:text-blue-500 transition-all font-thin text-yellow-300 text-[8px]'>
                  CHAPTER 2
                </p>
                <p className='font-thin text-xs'>Learn</p>
              </div>
            </AccordionItem>
            <AccordionItem className='group' value='chapter-3'>
              <div className='flex flex-col'>
                <p className='font-thin text-primary/70 group-hover:text-blue-500 transition-all text-[8px]'>
                  CHAPTER 3
                </p>
                <p className=' font-thin text-xs'>Explore</p>
              </div>
            </AccordionItem>
            <AccordionItem className='group' value='chapter-4'>
              <div className='flex flex-col'>
                <p className='group-hover:text-blue-500 transition-all font-thin  text-primary/70 text-[8px]'>
                  CHAPTER 4
                </p>
                <p className='font-thin text-xs'>Build</p>
              </div>
            </AccordionItem>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
