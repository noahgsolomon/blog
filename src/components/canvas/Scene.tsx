'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/helpers/global'
import { ACESFilmicToneMapping } from 'three'

export default function Scene({ ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas shadows {...props} onCreated={(state) => (state.gl.toneMapping = ACESFilmicToneMapping)}>
      <r3f.Out />
      <Preload all />
    </Canvas>
  )
}
