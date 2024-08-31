import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshStandardMaterial } from 'three'
import { GroupProps } from '@react-three/fiber'

export default function Zig(props: GroupProps) {
  const { nodes } = useGLTF('/models/zigv8.gltf')

  // Create a MeshStandardMaterial for a cool, metallic look
  const material = new MeshStandardMaterial({
    color: '#ff8c00', // Orange color
    roughness: 0.4, // Adjust roughness to control glossiness
    metalness: 0.7, // Higher metalness for a more metallic appearance
  })

  return (
    <group {...props} scale={0.1} dispose={null}>
      {/* Apply the MeshStandardMaterial to all meshes */}
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body1.geometry}
        material={material}
      />
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body1_1.geometry}
        material={material}
      />
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body1_2.geometry}
        material={material}
      />
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body2.geometry}
        material={material}
      />
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body3.geometry}
        material={material}
      />
    </group>
  )
}

useGLTF.preload('/models/zigv8.gltf')
