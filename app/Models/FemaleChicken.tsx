import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function FemaleChicken(props) {
  const { nodes, materials } = useGLTF('/models/femalechicken.glb')
  return (
    <group {...props} dispose={null}>
      {/* @ts-ignore */}
      <mesh castShadow receiveShadow geometry={nodes.Chicken_Female.geometry} material={materials.palette} />
    </group>
  )
}

useGLTF.preload('/models/femalechicken.glb')
