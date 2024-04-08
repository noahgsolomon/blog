export const DefaultTile = { heartGain: 0, coinGain: 0, stepGain: -1, type: 'DEFAULT', index: 0 }
export const BombTile = { heartGain: -2, coinGain: -3, stepGain: -1, type: 'BOMB', enabled: true, index: 1 }
export const HologramTile = { heartGain: -3, coinGain: -10, stepGain: -1, type: 'HOLOGRAM', index: 2 }
export const GumTile = { heartGain: 0, coinGain: 10, stepGain: -1, type: 'GUM', index: 3 }
export const PlumTile = { heartGain: 0, coinGain: 1, stepGain: -1, type: 'PLUM', index: 4 }
export const HoleTile = { heartGain: 0, coinGain: 0, stepGain: 0, type: 'HOLE', index: 5 }
export const CloneTile = { heartGain: 0, coinGain: 0, stepGain: 0, type: 'CLONE' }

export type TileType = DefaultTile | BombTile | HologramTile | GumTile | PlumTile

export type Position = { x: number; y: number }

export type AgentEnvironment = {
  tileMap: { type: TileType; position: Position }[]
  setTileMap: (tiles: { type: TileType; position: Position }[], i: number) => void
  index: number
  position: Position
  setPosition: (position: Position, i: number) => void
  steps: number
  setSteps: (steps: number, i: number) => void
  coins: number
  setCoins: (coins: number, i: number) => void
  // hearts: number
  // setHearts: (hearts: number, i: number) => void
  finished: boolean
  setFinished: (finished: boolean, i: number) => void
  rotation: number
  setRotation: (rotation: number, i: number) => void
  positionZ: number
  setPositionZ: (positionZ: number, i: number) => void
  positionX: number
  setPositionX: (positionX: number, i: number) => void
  positionY: number
  setPositionY: (positionY: number, i: number) => void
  startingTile: number
  setStartingTile: (startingTile: number) => void
}

export type EnvironmentState = {
  agentEnvironment: AgentEnvironment[]
  setAgentEnvironment: (agentEnvironment: AgentEnvironment, i: number) => void
  currentAgentIdx: number
  setCurrentAgentIdx: (currentAgentIdx: number) => void
  targetPosition: { x: number; y: number }
  setTargetPosition: (targetPosition: { x: number; y: number }) => void
  TILE_COUNT: number
}

// export type TileState = {
//   heartGain: number
//   coinGain: number
//   stepGain: number
//   // the 3 above should all be multiplied by some distance significance factor of (vision_length/(vision_length-1+distance))
// }

export type State = {
  posX: number
  posY: number
  targetPosX: number
  targetPosY: number
  distance: number
}

export type Action = {
  index: number
  name: 'left' | 'right' | 'up' | 'down'
}

export type AgentObservation = {
  agentIdx: number
  state: State
  action: Action
  actionOldProbability: number
  actionNewProbability: number
  reward: number
  complete: boolean
  valueOutput: number
  startStepTrajectoryNum: number
}

export type GameState = {
  state: string
  setState: (state: string) => void
  changingText: string
  setChangingText: (changingText: string) => void
  currentLvl: number
  setCurrentLvl: (currentLvl: number) => void
}
