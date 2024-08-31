'use client'
import dynamic from 'next/dynamic'
import React from 'react'
import { Center, Float } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'

const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
})

export default function BlogIcon3d({
  model: ModelComponent,
  props,
}: {
  model: React.ComponentType
  props: GroupProps
}) {
  return (
    <View className='hidden md:block size-[80px] rounded-lg p-1'>
      <Center>
        <Float speed={2} rotationIntensity={1} floatIntensity={1} floatingRange={[-0.3, 0.3]}>
          <directionalLight
            /*@ts-ignore */
            castShadow
            intensity={6}
            position={[-2, 5, 2]}
            shadow-camera-near={1}
            color={'#ffffff'}
          />
          {/*@ts-ignore */}
          <ModelComponent {...props} /> {/* Adjusted scale for better sizing */}
        </Float>
      </Center>
    </View>
  )
}
