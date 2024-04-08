import React from 'react'
import { useGLTF } from '@react-three/drei'
import { Mesh, MeshStandardMaterial } from 'three'
import { GroupProps } from '@react-three/fiber'

export function Skull(props: GroupProps) {
  const { nodes } = useGLTF('/models/skull.glb')

  const material = new MeshStandardMaterial({ color: '#ffffff' })

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {/*@ts-ignore */}
        <mesh castShadow receiveShadow geometry={(nodes.Cube_0 as Mesh).geometry} material={material} />
        {/*@ts-ignore */}
        <mesh castShadow receiveShadow geometry={(nodes.Cube001_0 as Mesh).geometry} material={material} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/skull.glb')
