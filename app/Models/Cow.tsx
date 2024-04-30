import React from 'react'
import { useGLTF } from '@react-three/drei'
import { AdditiveBlending, Color, DoubleSide, Mesh, ShaderMaterial, Uniform } from 'three'
import { GroupProps, useFrame } from '@react-three/fiber'
import { vertex as HologramVertexShader } from '../shaders/hologram/vertex'
import { fragment as HologramFragmentShader } from '../shaders/hologram/fragment'
import { useTheme } from 'next-themes'

export function Cow(props: GroupProps) {
  const { nodes, materials } = useGLTF('/models/cow.glb')

  // materials.palette.castShadow = true

  const theme = useTheme().resolvedTheme

  const material = new ShaderMaterial({
    vertexShader: HologramVertexShader,
    fragmentShader: HologramFragmentShader,
    uniforms: {
      uTime: new Uniform(0),
      uColor: new Uniform(new Color(theme === 'dark' ? '#70c1ff' : '#70c1ff')),
    },
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    blending: AdditiveBlending,
  })

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta
  })

  return (
    /*@ts-ignore */
    <group castShadow {...props} dispose={null}>
      {/*@ts-ignore */}
      <mesh castShadow geometry={nodes.Cow.geometry} material={material} />
    </group>
  )
}

useGLTF.preload('/models/cow.glb')
