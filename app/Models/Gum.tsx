import { MeshProps, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

export default function Gum(props: MeshProps) {
  const gumRef = useRef<Mesh>()

  useFrame((state, delta) => {
    gumRef.current.rotation.y += delta
    gumRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 + 0.5
  })

  return (
    /*@ts-ignore */
    <mesh castShadow ref={gumRef} position-y={0.5}>
      <dodecahedronGeometry args={[0.35, 0]} />
      <meshStandardMaterial color={'#fc4bb3'} />
    </mesh>
  )
}
