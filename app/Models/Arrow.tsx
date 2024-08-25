'use client'

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { MeshStandardMaterial } from 'three'

type ArrowProps = GroupProps & {
  opacity?: number
}

export function Arrow({ opacity = 1, ...props }: ArrowProps) {
  const { nodes, materials } = useGLTF('/models/arrow.glb')
  const theme = 'dark'

  const material = new MeshStandardMaterial({
    opacity,
    color: theme === 'dark' ? '#ffffff' : '#000000',
    transparent: true,
  })

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={0.125}>
          <mesh
            /*@ts-ignore */
            castShadow
            receiveShadow
            /*@ts-ignore */
            geometry={nodes.Object_5.geometry}
            material={material}
            scale={0.001}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/arrow.glb')
