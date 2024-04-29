'use client'

import { Html, RoundedBox } from '@react-three/drei'
import { useTheme } from 'next-themes'

const tiles = ({ theme }: { theme: 'light' | 'dark' }) => {
  const gridSize = 8 // Define the size of one side of the grid
  const tilePositions = []

  for (let i = 0; i < gridSize * gridSize; i++) {
    const x = i % gridSize // Calculates the column position
    const z = Math.floor(i / gridSize) // Calculates the row position
    tilePositions.push({ x, z })
  }

  return (
    <group position={[-10, 0, 0]}>
      {tilePositions.map(({ x, z }) => (
        <mesh key={`${x}-${z}`} position={[x - gridSize / 2 + 0.5, 0, z - gridSize / 2 + 0.5]}>
          <boxGeometry args={[0.9, 0.1, 0.9]} />
          {x === 1 && z === 1 && (
            <Html className='z-50'>
              <p className='z-50'>SUP</p>
            </Html>
          )}
          <meshStandardMaterial color={theme === 'dark' ? '#212336' : '#bcc0e3'} />
        </mesh>
      ))}
    </group>
  )
}

export default function ChapterOne() {
  const theme = useTheme().resolvedTheme as 'light' | 'dark'
  return (
    <>
      {tiles({ theme })}

      <directionalLight
        /*@ts-ignore */
        castShadow
        intensity={2}
        position={[-15, 3, 0]}
        shadow-mapSize={[256, 256]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        color={'#ffffff'}
      />
    </>
  )
}
