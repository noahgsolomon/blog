'use client'

import { Grid } from '@react-three/drei'
import { useTheme } from 'next-themes'

export default function PPO() {
  const theme = useTheme().resolvedTheme
  return (
    <>
      <mesh position={[-10, 0, 0]}>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
      <mesh position={[90, 0, 0]}>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
      <mesh position={[190, 0, 0]}>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
      <Grid
        position-y={-2}
        args={[10.5, 10.5]}
        cellSize={0.6}
        cellThickness={1}
        cellColor={theme === 'dark' ? '#6f6f6f' : '#d1d1d1'}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor={theme === 'dark' ? '#3A3D5E' : '#8c8c8c'}
        fadeDistance={50}
        fadeStrength={1}
        infiniteGrid
      />
    </>
  )
}
