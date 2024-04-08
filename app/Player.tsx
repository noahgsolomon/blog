import { animated, config, useSpring } from '@react-spring/three'
import { Text3D, useCursor } from '@react-three/drei'
import { forwardRef, useState } from 'react'
import Bunny from './Models/Bunny'
import Heart from './Models/Heart'
import useEnvironment from './store/useEnvironment'

export const Player = forwardRef<any, any>((props, ref) => {
  const [hovered, setHovered] = useState(false)

  useCursor(hovered)

  const { scale, rotation, positionY } = useSpring<{ scale: number; rotation: number; positionY: number }>({
    scale: hovered ? 1.2 : 1,
    rotation: 0,
    positionY: hovered ? 0.3 : 0,
    from: { scale: 0, rotation: Math.PI * 2 },
    config: config.gentle,
  })

  const environment = useEnvironment()

  return (
    <animated.group ref={ref} {...props}>
      {/* <animated.group position-y={positionY} scale={scale}>
        {[...Array(environment.agentEnvironment[environment.currentAgentIdx].hearts)].map((_, i) => (
          <Heart key={i} position-y={0.8} position-x={-0.4 + 0.4 * i} />
        ))}
        {environment.agentEnvironment[environment.currentAgentIdx].steps && (
          <Text3D position-y={1.2} position-x={-0.3} size={0.4} font={'/roboto.json'}>
            {environment.agentEnvironment[environment.currentAgentIdx].steps}
          </Text3D>
        )}
      </animated.group> */}
      <animated.group
        /*@ts-ignore */
        rotation-y={rotation}
        onPointerEnter={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerLeave={(e) => {
          e.stopPropagation()
          setHovered(false)
        }}
        position-y={positionY}
        scale={scale}
      >
        <Bunny />
      </animated.group>
    </animated.group>
  )
})

Player.displayName = 'Player'
