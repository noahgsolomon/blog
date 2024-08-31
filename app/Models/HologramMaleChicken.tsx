import React from 'react'
import { useGLTF } from '@react-three/drei'
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, Uniform } from 'three'
import { useFrame } from '@react-three/fiber'
import { vertex as HologramVertexShader } from '../shaders/hologram/vertex'
import { fragment as HologramFragmentShader } from '../shaders/hologram/fragment'

export function HologramMaleChicken(props) {
  const { nodes } = useGLTF('/models/malechicken.glb')

  const material = new ShaderMaterial({
    vertexShader: HologramVertexShader,
    fragmentShader: HologramFragmentShader,
    uniforms: {
      uTime: new Uniform(0),
      uColor: new Uniform(new Color('#70c1ff')), // Adjust color for hologram effect
    },
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    blending: AdditiveBlending,
  })

  // Update time uniform for animation effect
  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta
  })

  return (
    <group {...props} dispose={null}>
      {/* Apply the custom shader material to the chicken mesh */}
      <mesh
        //@ts-ignore
        geometry={nodes.Chichen_Male.geometry}
        material={material}
        position={[0, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/malechicken.glb')
