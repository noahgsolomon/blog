import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Crocodile(props) {
  const { nodes, materials } = useGLTF('/models/crocodile.glb')
  console.log(nodes)
  return (
    <group {...props} dispose={null}>
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes['Node_#4'].geometry}
        material={nodes['Node_#4'].material}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/crocodile.glb')
