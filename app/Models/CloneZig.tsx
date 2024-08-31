import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, Uniform } from 'three'
import { GroupProps, useFrame } from '@react-three/fiber'
import { vertex as HologramVertexShader } from '../shaders/hologram/vertex'
import { fragment as HologramFragmentShader } from '../shaders/hologram/fragment'

export default function CloneZig(props: GroupProps, opacity?: number) {
  const { nodes } = useGLTF('/models/zigv8.gltf')

  const material = new ShaderMaterial({
    vertexShader: HologramVertexShader,
    fragmentShader: HologramFragmentShader,
    uniforms: {
      uTime: new Uniform(0),
      uColor: new Uniform(new Color('#f7a41d')),
      uOpacity: new Uniform(opacity ?? 0.5),
    },
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    blending: AdditiveBlending,
  })

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta
  })

  // Ensure normal computation
  Object.values(nodes).forEach((node) => {
    if (node.geometry) {
      node.geometry.computeVertexNormals()
    }
  })

  return (
    <group {...props} dispose={null}>
      {/* Apply the custom shader material to all meshes */}
      <mesh
        /*@ts-ignore */
        geometry={nodes.Body1.geometry}
        material={material}
      />
      <mesh
        /*@ts-ignore */
        geometry={nodes.Body1_1.geometry}
        material={material}
      />
      <mesh
        /*@ts-ignore */
        geometry={nodes.Body1_2.geometry}
        material={material}
      />
      <mesh
        /*@ts-ignore */
        geometry={nodes.Body2.geometry}
        material={material}
      />
      <mesh
        /*@ts-ignore */
        geometry={nodes.Body3.geometry}
        material={material}
      />
    </group>
  )
}

useGLTF.preload('/models/zigv8.gltf')
