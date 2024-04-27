'use client'

export default function ChapterOne() {
  return (
    <group position={[-10, 0, 0]}>
      <mesh>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
      {/* <Crocodile scale={[0.1, 0.1, 0.1]} /> */}
    </group>
  )
}
