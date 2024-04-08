import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Mesh, MeshStandardMaterial } from 'three'
import { GroupProps } from '@react-three/fiber'

export function GlassBucket(props: GroupProps) {
  const { nodes } = useGLTF('/models/glassbucket.glb')

  const material = new MeshStandardMaterial({ opacity: 0.75, transparent: true, color: '#3A3D5E' })

  return (
    <group {...props} dispose={null}>
      <mesh
        /*@ts-ignore */
        castShadow
        geometry={(nodes.imagetostl_mesh0 as Mesh).geometry}
        material={material}
        position={[0, 0.38, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/glassbucket.glb')
