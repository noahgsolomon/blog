'use client'

import { Grid } from '@react-three/drei'
import ChapterOne from './ChapterOne'

export default function PPO() {
  const theme = 'dark'
  return (
    <>
      <ChapterOne />

      <group position={[90, 0, 0]}>
        <mesh>
          <meshStandardMaterial />
          <boxGeometry />
        </mesh>
      </group>
      <group position={[190, 0, 0]}>
        <mesh>
          <meshStandardMaterial />
          <boxGeometry />
        </mesh>
      </group>

      <Grid
        position-y={-2}
        args={[10.5, 10.5]}
        cellSize={0.6}
        cellThickness={1}
        cellColor={theme === 'dark' ? '#424242' : '#d1d1d1'}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor={theme === 'dark' ? '#2d2f49' : '#d4d4d4'}
        fadeDistance={50}
        fadeStrength={1}
        infiniteGrid
      />
    </>
  )
}
