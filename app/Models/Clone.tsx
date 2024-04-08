'use client'
import { useCursor } from '@react-three/drei'
import { forwardRef, useEffect, useState } from 'react'
import CloneBunny from '../CloneBunny'
import { GroupProps } from '@react-three/fiber'
import useEnvironment from '../store/useEnvironment'
import { SpringValue, animated } from '@react-spring/three'

interface CloneProps extends GroupProps {
  i: number
  movement: {
    positionX: SpringValue<number>
    positionZ: SpringValue<number>
    rotation: SpringValue<number>
  }[]
}

export const Clone = forwardRef<any, CloneProps>(({ i, movement, ...groupProps }, ref) => {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  const environment = useEnvironment()

  const agentsAtCurrentPosition = environment.agentEnvironment.filter((agent) => agent.startingTile === i)

  if (agentsAtCurrentPosition.length === 0) {
    return null
  }

  const agent = agentsAtCurrentPosition[0]

  return (
    <animated.group
      /*@ts-ignore */
      position-x={movement[agent.index].positionX}
      position-z={movement[agent.index].positionZ}
      position-y={agent.positionY}
      rotation-y={movement[agent.index].rotation}
      ref={ref}
      {...groupProps}
      onClick={() => {
        environment.setCurrentAgentIdx(agent.index)
      }}
      onPointerEnter={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerLeave={(e) => {
        e.stopPropagation()
        setHovered(false)
      }}
    >
      <CloneBunny />
    </animated.group>
  )
})

Clone.displayName = 'Clone'
