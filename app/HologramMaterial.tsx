'use client'
import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, Uniform } from 'three'
import { fragment } from './shaders/hologram/fragment'
import { vertex } from './shaders/hologram/vertex'
import { useFrame } from '@react-three/fiber'

export default function HologramMaterial() {
  const theme = 'dark'
  const material = new ShaderMaterial({
    uniforms: {
      uTime: new Uniform(0),
      uColor: new Uniform(new Color(theme === 'dark' ? '#3e4265' : '#7e85c9')),
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    blending: AdditiveBlending,
  })

  useFrame((state, delta) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime()
  })

  return <primitive object={material} attach='material' />
}
