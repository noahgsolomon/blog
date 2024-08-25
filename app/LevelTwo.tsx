'use client'

import 'regenerator-runtime/runtime'
import { animated, config, useSpring, useSprings } from '@react-spring/three'
import { Center, Grid, RoundedBox } from '@react-three/drei'
import { Player } from './Player'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Group } from 'three'
import { Clone } from './Models/Clone'
import HologramMaterial from './HologramMaterial'
import Gum from './Models/Gum'
import useEnvironment from './store/useEnvironment'
import { Position, TileType, DefaultTile, GumTile, HologramTile, State } from '@/index.d'
import useGameState from './store/useGameState'

import { createModelCpu, runModel, warmupModel } from './runModel'
import { InferenceSession } from 'onnxruntime-web/wasm'

export const NUM_AGENTS = 10

export default function LevelTwo() {
  const [policyNetwork, setPolicyNetwork] = useState<InferenceSession>(null)
  const [intervalIter, setIntervalIter] = useState(0)

  const theme = 'dark'

  useEffect(() => {
    const loadModels = async () => {
      gameState.setState('LOADING_MODEL')
      try {
        const modelFile = await fetch('/model/actorlvl2.onnx')
        const modelBuffer = await modelFile.arrayBuffer()
        const policyNetwork = await createModelCpu(modelBuffer)
        warmupModel(policyNetwork, 14)
        console.log('Model loaded successfully')
        setPolicyNetwork(policyNetwork)
        gameState.setState('CHANGING')
      } catch (error) {
        console.error('Error loading the model:', error)
      }
    }

    loadModels()
  }, [])

  const AnimatedGrid = animated(Grid)
  const TILE_COUNT = 625
  const VISION_LENGTH = 1

  const [springs, _] = useSprings(TILE_COUNT, (i) => {
    const row = Math.floor(i / Math.sqrt(TILE_COUNT))
    const col = i % Math.sqrt(TILE_COUNT)
    const centerRow = 4.5
    const centerCol = 4.5
    const distance = Math.sqrt((row - centerRow) ** 2 + (col - centerCol) ** 2)

    return {
      from: { scale: 0 },
      to: { scale: 1 },
      delay: distance * 50,
      config: config.gentle,
    }
  })

  const baseSpring = useSpring({
    from: { positionY: -3 },
    to: { positionY: -1.5 },
    config: config.gentle,
  })

  const player = useRef<Group>()

  const environment = useEnvironment()
  const gameState = useGameState()

  const [mapResetCount, setMapResetCount] = useState(0)

  const agentTiles = useMemo(() => {
    const randTiles = []
    for (let i = 0; i < NUM_AGENTS; i++) {
      let rand = Math.round(Math.random() * TILE_COUNT - 1)
      while (
        randTiles.includes(rand) ||
        rand % Math.sqrt(TILE_COUNT) < 1 ||
        Math.floor(rand / Math.sqrt(TILE_COUNT)) < 1 ||
        rand % Math.sqrt(TILE_COUNT) >= Math.sqrt(TILE_COUNT) - 1 ||
        Math.floor(rand / Math.sqrt(TILE_COUNT)) >= Math.sqrt(TILE_COUNT) - 1
      ) {
        rand = Math.round(Math.random() * TILE_COUNT - 1)
      }
      randTiles.push(rand)
    }
    return randTiles
  }, [mapResetCount])

  const generateTileMap = () => {
    let holyTile = Math.round(Math.random() * TILE_COUNT - 1)
    while (
      holyTile % Math.sqrt(TILE_COUNT) < 1 ||
      Math.floor(holyTile / Math.sqrt(TILE_COUNT)) < 1 ||
      holyTile % Math.sqrt(TILE_COUNT) >= Math.sqrt(TILE_COUNT) - 1 ||
      Math.floor(holyTile / Math.sqrt(TILE_COUNT)) >= Math.sqrt(TILE_COUNT) - 1 ||
      agentTiles.includes(holyTile)
    ) {
      holyTile = Math.round(Math.random() * TILE_COUNT - 1)
    }

    environment.setTargetPosition({
      x: holyTile % Math.sqrt(TILE_COUNT),
      y: Math.floor(holyTile / Math.sqrt(TILE_COUNT)),
    })

    const newTileMap = springs.reduce(
      (acc, _, i) => {
        const { tile } = generateTiles(i, agentTiles)

        acc.push({
          type:
            holyTile === i
              ? GumTile
              : i % Math.sqrt(TILE_COUNT) < 1 ||
                  Math.floor(i / Math.sqrt(TILE_COUNT)) < 1 ||
                  i % Math.sqrt(TILE_COUNT) >= Math.sqrt(TILE_COUNT) - 1 ||
                  Math.floor(i / Math.sqrt(TILE_COUNT)) >= Math.sqrt(TILE_COUNT) - 1
                ? HologramTile
                : tile === 'GUM'
                  ? GumTile
                  : tile === 'HOLOGRAM'
                    ? HologramTile
                    : DefaultTile,
          position: { x: i % Math.sqrt(TILE_COUNT), y: Math.floor(i / Math.sqrt(TILE_COUNT)) },
        })
        return acc
      },
      [] as { type: TileType; position: Position }[],
    )
    return newTileMap
  }

  const [movement, movementApi] = useSprings(NUM_AGENTS, (i) => ({
    positionX: environment.agentEnvironment[i].positionX,
    positionZ: environment.agentEnvironment[i].positionZ,
    rotation: environment.agentEnvironment[i].rotation,
    config: config.gentle,
  }))

  // RESETS AGENT METRICS BEFORE NEXT MAP CHANGE
  const resetAgentMetrics = () => {
    for (let i = 0; i < NUM_AGENTS; i++) {
      environment.agentEnvironment[i].setCoins(0, i)
      environment.agentEnvironment[i].setFinished(false, i)
      environment.agentEnvironment[i].setPositionY(0.5, i)
      environment.agentEnvironment[i].setPosition(
        {
          x: agentTiles[i] % Math.sqrt(TILE_COUNT),
          y: Math.floor(agentTiles[i] / Math.sqrt(TILE_COUNT)),
        },
        i,
      )
    }
  }

  // MOVE AGENT
  const move = (direction: 'left' | 'right' | 'up' | 'down', agentIdx: number) => {
    const agent = environment.agentEnvironment[agentIdx]
    const TILE_COUNT = environment.TILE_COUNT

    if (agent.finished) return

    let nextTile, nextTileType, positionX, positionZ, rotation

    switch (direction) {
      case 'left':
        nextTile = agent.tileMap[agent.position.x - 1 + Math.sqrt(TILE_COUNT) * agent.position.y]
        nextTileType = nextTile?.type

        if (!nextTileType || !nextTileType?.type) return

        agent.position.x -= 1
        positionX = agent.positionX - 1.1
        rotation = -Math.PI * 0.5
        if (nextTileType.type === 'HOLOGRAM') {
          agent.setPositionY(-0.9, agentIdx)
          agent.setFinished(true, agentIdx)
        } else if (nextTileType.type === 'GUM') {
          agent.setFinished(true, agentIdx)
          nextTile.type = DefaultTile
        }

        movementApi.start((i) => {
          if (i === agentIdx) {
            return {
              positionX,
              rotation,
            }
          }
          return {}
        })
        agent.setRotation(rotation, agentIdx)
        agent.setPositionX(positionX, agentIdx)
        break

      case 'right':
        nextTile = agent.tileMap[agent.position.x + 1 + Math.sqrt(TILE_COUNT) * agent.position.y]
        nextTileType = nextTile?.type

        if (!nextTileType || !nextTileType?.type) return

        agent.position.x += 1
        positionX = agent.positionX + 1.1
        rotation = Math.PI * 0.5
        if (nextTileType.type === 'HOLOGRAM') {
          agent.setPositionY(-0.9, agentIdx)
          agent.setFinished(true, agentIdx)
        } else if (nextTileType.type === 'GUM') {
          agent.setFinished(true, agentIdx)
          nextTile.type = DefaultTile
        }

        movementApi.start((i) => {
          if (i === agentIdx) {
            return {
              positionX,
              rotation,
            }
          }
          return {}
        })
        agent.setRotation(rotation, agentIdx)
        agent.setPositionX(positionX, agentIdx)

        break

      case 'up':
        nextTile = agent.tileMap[agent.position.x + Math.sqrt(TILE_COUNT) * (agent.position.y - 1)]
        nextTileType = nextTile?.type

        if (!nextTileType || !nextTileType?.type) return

        agent.position.y -= 1
        positionZ = agent.positionZ - 1.1
        rotation = Math.PI

        if (nextTileType.type === 'HOLOGRAM') {
          agent.setPositionY(-0.9, agentIdx)
          agent.setFinished(true, agentIdx)
        } else if (nextTileType.type === 'GUM') {
          agent.setFinished(true, agentIdx)
          nextTile.type = DefaultTile
        }

        movementApi.start((i) => {
          if (i === agentIdx) {
            return {
              positionZ,
              rotation,
            }
          }
          return {}
        })
        agent.setRotation(rotation, agentIdx)
        agent.setPositionZ(positionZ, agentIdx)
        break

      case 'down':
        nextTile = agent.tileMap[agent.position.x + Math.sqrt(TILE_COUNT) * (agent.position.y + 1)]
        nextTileType = nextTile?.type

        if (!nextTileType || !nextTileType?.type) return

        agent.position.y += 1
        positionZ = agent.positionZ + 1.1
        rotation = 0

        if (nextTileType.type === 'HOLOGRAM') {
          agent.setPositionY(-0.9, agentIdx)
          agent.setFinished(true, agentIdx)
        } else if (nextTileType.type === 'GUM') {
          agent.setFinished(true, agentIdx)
          nextTile.type = DefaultTile
        }

        movementApi.start((i) => {
          if (i === agentIdx) {
            return {
              positionZ,
              rotation,
            }
          }
          return {}
        })
        agent.setRotation(rotation, agentIdx)
        agent.setPositionZ(positionZ, agentIdx)

        break
    }
  }

  // UPDATE MAP AND SET AGENT INITIAL POSITION
  useEffect(() => {
    movementApi.start(() => {
      return {
        positionX: 0,
        positionZ: 0,
        rotation: 0,
      }
    })

    const newTileMap = generateTileMap()

    for (let i = 0; i < NUM_AGENTS; i++) {
      environment.agentEnvironment[i].setPositionX(0, i)
      environment.agentEnvironment[i].setPositionZ(0, i)
      const clonedTileMap = structuredClone(newTileMap)
      environment.agentEnvironment[i].setTileMap(clonedTileMap, i)
      environment.agentEnvironment[i].setPosition(
        {
          x: agentTiles[i] % Math.sqrt(TILE_COUNT),
          y: Math.floor(agentTiles[i] / Math.sqrt(TILE_COUNT)),
        },
        i,
      )

      environment.agentEnvironment[i].setStartingTile(agentTiles[i])
    }
  }, [agentTiles])

  useEffect(() => {
    let intervalId

    const moveAgents = async () => {
      const directions: ('left' | 'right' | 'up' | 'down')[] = ['left', 'up', 'right', 'down']

      let numFinished = 0

      const states: (State & { vision: number[] })[] = []

      for (const agent of environment.agentEnvironment) {
        const agentPosition = agent.position

        const vision = []

        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            const x = agent.position.x + i
            const y = agent.position.y + j
            vision.push(agent.tileMap[Math.sqrt(TILE_COUNT) * y + x]?.type.type === 'HOLOGRAM' ? 1 : 0)
          }
        }

        states.push({
          vision,
          posX: agentPosition.x / Math.sqrt(TILE_COUNT),
          posY: agentPosition.y / Math.sqrt(TILE_COUNT),
          targetPosX: environment.targetPosition.x / Math.sqrt(TILE_COUNT),
          targetPosY: environment.targetPosition.y / Math.sqrt(TILE_COUNT),
          distance: Math.sqrt(
            Math.pow(
              environment.targetPosition.x / Math.sqrt(TILE_COUNT) - agentPosition.x / Math.sqrt(TILE_COUNT),
              2,
            ) +
              Math.pow(
                environment.targetPosition.y / Math.sqrt(TILE_COUNT) - agentPosition.y / Math.sqrt(TILE_COUNT),
                2,
              ),
          ),
        })
      }

      const inputData = states.map((state) => [
        ...state.vision,
        state.posX,
        state.posY,
        state.targetPosX,
        state.targetPosY,
        state.distance,
      ])

      const [actions, avgTime] = await runModel(policyNetwork, inputData, 14)
      for (let i = 0; i < NUM_AGENTS; i++) {
        if (environment.agentEnvironment[i].finished) {
          numFinished += 1
        } else {
          move(directions[actions[i]], i)
        }
      }

      if (intervalIter % 3 === 0) {
        const rand = []

        for (let i = 0; i < environment.agentEnvironment[environment.currentAgentIdx].tileMap.length; i++) {
          rand.push(Math.random())
        }

        const agentPositions = environment.agentEnvironment.map((agent) => agent.position)
        for (const agent of environment.agentEnvironment) {
          const tileMap = agent.tileMap
          let newTileMap = structuredClone(agent.tileMap)
          let i = 0
          for (const tile of tileMap) {
            if (
              tile.type.type === 'HOLOGRAM' &&
              tile.position.x < Math.sqrt(TILE_COUNT) - 1 &&
              tile.position.y < Math.sqrt(TILE_COUNT) - 1 &&
              tile.position.x > 0 &&
              tile.position.y > 0
            ) {
              let position = structuredClone(tile.position)
              position.x = position.x + (rand[i] < 0.25 ? -1 : rand[i] < 0.5 ? 1 : 0)
              position.y = position.y + (rand[i] > 0.75 ? -1 : rand[i] >= 0.5 ? 1 : 0)
              const futureTile = tileMap.filter(
                (tile) => tile.position.x === position.x && tile.position.y === position.y,
              )
              if (
                futureTile.length > 0 &&
                futureTile[0].type.type === 'DEFAULT' &&
                agentPositions.filter(
                  (agentPosition) => agentPosition.x === position.x && agentPosition.y === position.y,
                ).length === 0
              ) {
                newTileMap[i].type = DefaultTile
                newTileMap[position.x + position.y * Math.sqrt(TILE_COUNT)].type = HologramTile
              }
            }
            i += 1
          }
          agent.setTileMap(newTileMap, agent.index)
        }
      }

      if (numFinished >= NUM_AGENTS * 0.8) {
        resetAgentMetrics()
        setMapResetCount((prevCount) => prevCount + 1)
        gameState.setState('CHANGING')
      }
      setIntervalIter((prev) => prev + 1)
    }

    if (gameState.state === 'RUNNING') {
      intervalId = setInterval(() => {
        moveAgents()
      }, 250)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [environment.agentEnvironment, gameState.state])

  useEffect(() => {
    if (gameState.state === 'CHANGING') {
      const startGame = () => {
        gameState.setChangingText('READY?')
        setTimeout(() => {
          gameState.setChangingText('GO!')
          setTimeout(() => {
            gameState.setState('RUNNING')
          }, 750)
        }, 750)
      }
      startGame()
    }
  }, [gameState.state])

  return (
    <>
      {/* <Perf /> */}
      <Center top position-y={0.3}>
        {springs.map((props, i) => {
          const tile = environment?.agentEnvironment[environment.currentAgentIdx]?.tileMap[i]
          const tileType = tile?.type.type

          return (
            <Fragment key={i}>
              <animated.mesh
                scale={props.scale}
                key={i}
                position={[(i % Math.sqrt(TILE_COUNT)) * 1.1, 1, Math.floor(i / Math.sqrt(TILE_COUNT)) * 1.1]}
              >
                {agentTiles.includes(i) ? (
                  agentTiles[environment.currentAgentIdx] === i ? (
                    <>
                      <Player
                        rotation-y={movement[environment.currentAgentIdx].rotation}
                        position-x={movement[environment.currentAgentIdx].positionX}
                        position-z={movement[environment.currentAgentIdx].positionZ}
                        position-y={environment.agentEnvironment[environment.currentAgentIdx].positionY}
                        ref={player}
                      />
                    </>
                  ) : (
                    <Clone movement={movement} i={i} />
                  )
                ) : null}
                {/*@ts-ignore */}
                <RoundedBox castShadow receiveShadow args={[1, 0.1, 1]}>
                  {tileType !== 'HOLOGRAM' ? (
                    <meshStandardMaterial
                      color={
                        Math.abs(
                          environment.agentEnvironment[environment.currentAgentIdx].position.x -
                            (i % Math.sqrt(TILE_COUNT)),
                        ) <= VISION_LENGTH &&
                        Math.abs(
                          environment.agentEnvironment[environment.currentAgentIdx].position.y -
                            Math.floor(i / Math.sqrt(TILE_COUNT)),
                        ) <= VISION_LENGTH
                          ? '#00ff00'
                          : tileType === 'BOMB'
                            ? '#FF3D33'
                            : theme === 'dark'
                              ? '#3A3D5E'
                              : '#d7dafc'
                      }
                    />
                  ) : (
                    <HologramMaterial />
                  )}
                </RoundedBox>
                {tileType === 'GUM' ? <Gum /> : null}
              </animated.mesh>
            </Fragment>
          )
        })}
      </Center>
      {/*@ts-ignore */}
      <animated.mesh position-y={baseSpring.positionY} rotation-x={Math.PI * 0.5}>
        {/*@ts-ignore */}
        <RoundedBox receiveShadow args={[30, 30]}>
          <meshStandardMaterial color={theme === 'dark' ? '#212336' : '#bcc0e3'} />
        </RoundedBox>
      </animated.mesh>
      <AnimatedGrid
        position-y={baseSpring.positionY}
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

const generateTiles = (i: number, agentTiles: number[]) => {
  const hologram = Math.random() > 0.85 && !agentTiles.includes(i)
  const tile = hologram ? 'HOLOGRAM' : 'DEFAULT'

  return {
    tile,
  }
}
