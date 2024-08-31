import React from 'react'
import { useGLTF } from '@react-three/drei'
import { AdditiveBlending, Color, DoubleSide, Mesh, ShaderMaterial, Uniform } from 'three'
import { GroupProps, useFrame } from '@react-three/fiber'
import { vertex as HologramVertexShader } from '../shaders/hologram/vertex'
import { fragment as HologramFragmentShader } from '../shaders/hologram/fragment'

export default function CloneChicken(props: GroupProps, opacity?: number) {
  const { nodes } = useGLTF('/models/femalechicken.glb')

  const material = new ShaderMaterial({
    vertexShader: HologramVertexShader,
    fragmentShader: HologramFragmentShader,
    uniforms: {
      uTime: new Uniform(0),
      uColor: new Uniform(new Color('#70c1ff')),
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

  return (
    <group scale={0.25} {...props} dispose={null}>
      <mesh
        //@ts-ignore
        geometry={(nodes.Chicken_Female as Mesh).geometry}
        material={material}
        position={[0, -0.5, 0]}
        scale={[1, 1.101, 0.738]}
      />
    </group>
  )
}

useGLTF.preload('/models/femalechicken.glb')
