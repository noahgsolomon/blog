import React from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshMatcapMaterial } from 'three'
import { GroupProps } from '@react-three/fiber'
import * as THREE from 'three'

export default function Zig(props: GroupProps) {
  const { nodes } = useGLTF('/models/zigv8.gltf')

  // Create a MeshMatcapMaterial for a unique material capture look
  const matcapMaterial = new MeshMatcapMaterial({
    matcap: new THREE.TextureLoader().load('/zigmatcap3.png'), // Path to your matcap texture
  })
  //
  // Object.values(nodes).forEach((node) => {
  //   if (node.geometry) {
  //     node.geometry.computeVertexNormals()
  //   }
  // })

  return (
    <group {...props} scale={0.1} dispose={null}>
      {/* Apply the MeshMatcapMaterial to all meshes */}
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body1.geometry}
        material={matcapMaterial}
      />
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body1_1.geometry}
        material={matcapMaterial}
      />
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body1_2.geometry}
        material={matcapMaterial}
      />
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body2.geometry}
        material={matcapMaterial}
      />
      <mesh
        /*@ts-ignore */
        castShadow
        receiveShadow
        geometry={nodes.Body3.geometry}
        material={matcapMaterial}
      />
    </group>
  )
}

useGLTF.preload('/models/zigv8.gltf')
