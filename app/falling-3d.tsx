'use client'

import React, { useRef, useState } from 'react'
import { useThree, useFrame, Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { AsciiRenderer, Environment } from '@react-three/drei'
import { EffectComposer, DepthOfField, ToneMapping } from '@react-three/postprocessing'
import CloneBunny from './Models/CloneBunny'
import Zig from './Models/Zig'
import Lights from './Lights'
import CloneZig from './Models/CloneZig'
import CloneFemaleChicken from './Models/CloneFemaleChicken'

function Chicken({ index, z, speed }) {
  const ref = useRef()
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])

  const [data] = useState({
    y: THREE.MathUtils.randFloatSpread(height * 2),
    x: THREE.MathUtils.randFloatSpread(2),
    spin: THREE.MathUtils.randFloat(8, 12),
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  useFrame((state, dt) => {
    //@ts-ignore
    if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z)
    //@ts-ignore
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin),
    )
    if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
  })

  return (
    <group ref={ref}>{Math.random() > 0.4 ? <CloneFemaleChicken scale={0.1} /> : <CloneZig scale={0.025} />}</group>
  )
}

export default function Falling3D() {
  return (
    <Canvas
      flat
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 20], fov: 20, near: 5, far: 40 + 15 }}
      className='bg-[#16161d] hidden w-full md:block fixed inset-0'
    >
      {Array.from({ length: 15 }, (_, i) => (
        <Chicken key={i} index={i} z={Math.round((i / 40) * 40)} speed={1} />
      ))}
      <Environment preset='sunset' />
      <EffectComposer multisampling={0}>
        <DepthOfField target={[0, 0, 60]} focalLength={1} bokehScale={14} height={700} />
        <ToneMapping />
      </EffectComposer>
    </Canvas>
  )
}
