import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/cow.glb')
  return (
    <group {...props} dispose={null}>
      {/*@ts-ignore */}
      <mesh castShadow receiveShadow geometry={nodes.Cow.geometry} material={materials.palette} />
    </group>
  )
}

useGLTF.preload('/models/cow.glb')
