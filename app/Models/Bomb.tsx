import React from 'react'
import { useGLTF } from '@react-three/drei'
import { Mesh, MeshStandardMaterial } from 'three'
import { GroupProps } from '@react-three/fiber'

export default function Bomb(props: GroupProps) {
  const { nodes, materials } = useGLTF('/models/bomb.glb')
  const material = new MeshStandardMaterial()
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={300}>
        {/*@ts-ignore */}
        <mesh castShadow geometry={(nodes.Bomb_1 as Mesh).geometry} material={materials.Black} />
        {/*@ts-ignore */}
        <mesh castShadow geometry={(nodes.Bomb_2 as Mesh).geometry} material={materials.Grey} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/bomb.glb')
