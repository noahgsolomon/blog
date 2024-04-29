'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Float, Html, RoundedBox } from '@react-three/drei'
import { Play } from 'lucide-react'
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
    <Float speed={0.25} floatIntensity={0.25} floatingRange={[1, 5]}>
      <group position={[-10, 0, 0]}>
        {tilePositions.map(({ x, z }) => (
          <mesh key={`${x}-${z}`} position={[x - gridSize / 2 + 0.5, 0, z - gridSize / 2 + 0.5]}>
            <boxGeometry args={[0.9, 0.1, 0.9]} />
            <meshStandardMaterial color={theme === 'dark' ? '#212336' : '#bcc0e3'} />
          </mesh>
        ))}
        <Html position={[0, 1, 0]} distanceFactor={10}>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='generate'
                  className={'generate-button whitespace-nowrap text-center outline-none transition-all'}
                >
                  <div className={'rounded-full border border-input bg-secondary p-4  tracking-wider outline-none '}>
                    <Play className='fill-primary size-4 text-primary' />
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Play 3D</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Html>
      </group>
    </Float>
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
