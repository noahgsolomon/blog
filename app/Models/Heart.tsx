import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { Mesh } from 'three'

export default function Heart(props: GroupProps) {
  const { nodes, materials } = useGLTF('/models/heart.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        scale={0.3}
        /*@ts-ignore */
        geometry={(nodes.heart_teamRed as Mesh).geometry}
        material={materials['Red.015']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/heart.glb')
