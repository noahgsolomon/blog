'use client'

import { RoundedBox, useHelper } from '@react-three/drei'
import { DirectionalLightHelperProps } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import { useRef, useState } from 'react'
import { DirectionalLightHelper } from 'three'

const tiles = () => {
  const gridSize = 8 // Define the size of one side of the grid
  const tilePositions = []
  const theme = useTheme().resolvedTheme

  for (let i = 0; i < gridSize * gridSize; i++) {
    const x = i % gridSize // Calculates the column position
    const z = Math.floor(i / gridSize) // Calculates the row position
    tilePositions.push({ x, z })
  }

  return (
    <group>
      {tilePositions.map(({ x, z }) => (
        <RoundedBox
          key={`${x}-${z}`}
          args={[0.9, 0.1, 0.9]}
          position={[x - gridSize / 2 + 0.5, 0, z - gridSize / 2 + 0.5]}
        >
          <meshStandardMaterial color={theme === 'dark' ? '#212336' : '#bcc0e3'} />
        </RoundedBox>
      ))}
    </group>
  )
}

export default function ChapterOne() {
  return (
    <>
      <group position={[-10, 0, 0]}>{tiles()}</group>
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
