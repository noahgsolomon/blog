'use client'
import { Cow } from '@/Models/Cow'
import { Button } from '@/components/ui/button'
import { Html, useHelper } from '@react-three/drei'
import { Play } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { DirectionalLightHelper } from 'three'

const Tiles = ({ theme }: { theme: 'light' | 'dark' }) => {
  const gridSize = 8 // Define the size of one side of the grid
  const tilePositions = []
  for (let i = 0; i < gridSize * gridSize; i++) {
    const x = i % gridSize // Calculates the column position
    const z = Math.floor(i / gridSize) // Calculates the row position
    tilePositions.push({ x, z })
  }

  // const lightRef = useRef();
  // useHelper(lightRef, DirectionalLightHelper, 3, 'red');

  const [target, setTarget] = useState()
  const gridRef = useRef()

  useEffect(() => {
    if (gridRef.current) {
      setTarget(gridRef.current)
    }
  }, [gridRef])

  return (
    <>
      {/* <Float speed={0.1} floatIntensity={0.1} floatingRange={[1, 2]}> */}
      <group ref={gridRef} position={[-10, 0, 0]}>
        {tilePositions.map(({ x, z }) => {
          const isOdd = (x + z) % 2 === 1
          const isGold = x === 1 && z === 1
          let color
          if (isGold) {
            color = 'gold'
          } else if (theme === 'dark') {
            color = isOdd ? '#212336' : '#212336'
          } else {
            color = isOdd ? '#bcc0e3' : '#bcc0e3'
          }

          return (
            <>
              {/*@ts-ignore*/}
              <mesh receiveShadow key={`${x}-${z}`} position={[x - gridSize / 2 + 0.5, 0, z - gridSize / 2 + 0.5]}>
                <boxGeometry args={[0.9, 0.1, 0.9]} />
                <meshStandardMaterial receiveShadow color={color} />
                {x === 4 && z === 7 ? (
                  <>
                    <Cow position-y={0.1} rotation-y={-0.25 * Math.PI} scale={0.05} />
                    <Html castShadow position={[0, 1, 0]} distanceFactor={10}>
                      <Button
                        variant='generate'
                        size='sm'
                        className={'generate-button whitespace-nowrap text-center outline-none transition-all'}
                      >
                        <div
                          className={
                            'border border-input bg-secondary p-1 tracking-wider outline-none text-xs text-primary'
                          }
                        >
                          Play
                        </div>
                      </Button>
                    </Html>
                  </>
                ) : null}
              </mesh>
            </>
          )
        })}
      </group>
      {/* </Float> */}
      <directionalLight
        // ref={lightRef}
        /*@ts-ignore*/
        target={target}
        /*@ts-ignore*/
        castShadow
        intensity={5}
        position={[-10, 10, 5]}
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

export default function ChapterOne() {
  const theme = useTheme().resolvedTheme as 'light' | 'dark'
  return <Tiles theme={theme} />
}
