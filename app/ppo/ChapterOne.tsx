'use client'
import { Cow } from '@/Models/Cow'
import { Button } from '@/components/ui/button'
import { Center, Html } from '@react-three/drei'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import usePlayStore from './store/PlayStore'
import { CHECKPOINTS } from './Checkpoints'
import * as THREE from 'three'
import Markdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import PlayCard from './PlayCard'

export default function ChapterOne() {
  const theme = useTheme().resolvedTheme as 'light' | 'dark'
  const gridSize = 8
  const tilePositions = []
  for (let i = 0; i < gridSize * gridSize; i++) {
    const x = i % gridSize
    const z = Math.floor(i / gridSize)
    tilePositions.push({ x, z })
  }

  const [target, setTarget] = useState()
  const gridRef = useRef()

  useEffect(() => {
    if (gridRef.current) {
      setTarget(gridRef.current)
    }
  }, [gridRef])

  const { setCurrentPlayPosition, currentPlayPosition, setFocus, setLook } = usePlayStore()

  return (
    <>
      <group ref={gridRef} position={[-10, 0, 0]}>
        {tilePositions.map(({ x, z }) => {
          const isOdd = (x + z) % 2 === 1
          const isGold = x === 1 && z === 1
          let color
          if (isGold) {
            color = 'gold'
          }

          return (
            <>
              {/*@ts-ignore*/}
              <mesh receiveShadow key={`${x}-${z}`} position={[x - gridSize / 2 + 0.5, 0, z - gridSize / 2 + 0.5]}>
                <boxGeometry args={[0.9, 0.1, 0.9]} />
                <meshStandardMaterial
                  receiveShadow
                  color={isGold ? 'gold' : theme === 'dark' ? '#212336' : '#bcc0e3'}
                />
                {isGold && currentPlayPosition === 1 ? (
                  <PlayCard
                    castShadow
                    position={[-2, 1.5, -1]}
                    distanceFactor={5}
                    markdown={CHECKPOINTS[0].play[currentPlayPosition].markdown}
                  />
                ) : null}
                {x === 4 && z === 7 ? (
                  <>
                    <Cow position-y={0.1} rotation-y={-0.25 * Math.PI} scale={0.05} />
                    {currentPlayPosition === -1 ? (
                      <Html castShadow position={[0, 1, 0]} distanceFactor={10}>
                        <Button
                          onClick={() => {
                            setCurrentPlayPosition(0)
                            setFocus(new THREE.Vector3(...CHECKPOINTS[0].play[0].position))
                            setLook(new THREE.Vector3(...CHECKPOINTS[0].play[0].look))
                          }}
                          variant='generate'
                          size='sm'
                          className={`generate-button whitespace-nowrap text-center outline-none transition-all`}
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
                    ) : null}
                    {currentPlayPosition === 0 ? (
                      <PlayCard
                        castShadow
                        position={[0, 2, -2]}
                        distanceFactor={5}
                        markdown={CHECKPOINTS[0].play[currentPlayPosition].markdown}
                      />
                    ) : null}
                  </>
                ) : null}
              </mesh>
            </>
          )
        })}
      </group>
      <directionalLight
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
