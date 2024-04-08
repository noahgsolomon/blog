import React from 'react'
import { useGLTF } from '@react-three/drei'
import { Mesh, MeshStandardMaterial } from 'three'
import { GroupProps } from '@react-three/fiber'
import useEnvironment from '../store/useEnvironment'

export default function Bunny(props: GroupProps) {
  const { nodes, materials } = useGLTF('/models/bunny.glb')

  const colors = [
    '#FFB6C1',
    '#FFD700',
    '#FFA07A',
    '#FF69B4',
    '#FFE4E1',
    '#FF6347',
    '#FFA500',
    '#FFC0CB',
    '#FF4500',
    '#FFDAB9',
    '#FF8C00',
    '#FFA07A',
    '#FF1493',
    '#FF69B4',
    '#FF6347',
    '#FFA500',
    '#FFB6C1',
    '#FF4500',
    '#FFD700',
    '#FF8C00',
    '#FFA07A',
    '#FF69B4',
    '#FF6347',
    '#FFB6C1',
    '#FFDAB9',
  ]

  const agentIdx = useEnvironment((s) => s.currentAgentIdx)

  const hairMaterial = new MeshStandardMaterial({ color: colors[agentIdx] ?? '#ffffff', metalness: 0, roughness: 1 })

  return (
    <group scale={0.25} {...props} dispose={null}>
      <group position={[0, -0.5, 0]} scale={[1, 1.101, 0.738]}>
        {/*@ts-ignore */}
        <mesh castShadow geometry={(nodes.Cube as Mesh).geometry} material={hairMaterial} />
        {/*@ts-ignore */}
        <mesh castShadow geometry={(nodes.Cube_1 as Mesh).geometry} material={materials.InsideEar} />
        {/*@ts-ignore */}
        <mesh castShadow geometry={(nodes.Cube_2 as Mesh).geometry} material={materials.Eye} />
        {/*@ts-ignore */}
        <mesh castShadow geometry={(nodes.Cube_3 as Mesh).geometry} material={materials.Reflection} />
        {/*@ts-ignore */}
        <mesh castShadow geometry={(nodes.Cube_4 as Mesh).geometry} material={materials[' Nose']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/bunny.glb')
