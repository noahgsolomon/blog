import React from 'react'
import { useGLTF } from '@react-three/drei'

export function MaleChicken(props) {
  const { nodes, materials } = useGLTF('/models/malechicken.glb')
  return (
    <group {...props} dispose={null}>
      {/*@ts-ignore */}
      <mesh castShadow receiveShadow geometry={nodes.Chichen_Male.geometry} material={materials.palette} />
    </group>
  )
}

useGLTF.preload('/models/malechicken.glb')
