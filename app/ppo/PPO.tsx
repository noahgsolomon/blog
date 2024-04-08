'use client'

export default function PPO({ zoomToView }) {
  return (
    <>
      <mesh position={[0, 0, 0]} onClick={(e: any) => zoomToView(e.object.position)}>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
      <mesh position={[2, 0, 0]} onClick={(e: any) => zoomToView(e.object.position)}>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
      <mesh position={[-2, 0, 0]} onClick={(e: any) => zoomToView(e.object.position)}>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
    </>
  )
}
