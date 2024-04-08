import { create } from 'zustand'
import { EnvironmentState, Position, TileType } from '@/index.d'

const NUM_AGENTS = 10

const useEnvironment = create<EnvironmentState>()((set) => ({
  TILE_COUNT: 625,
  targetPosition: { x: 0, y: 0 },
  setTargetPosition: (targetPosition: { x: number; y: number }) => set((state) => ({ ...state, targetPosition })),
  agentEnvironment: [...Array(NUM_AGENTS)].map((_, i) => ({
    position: { x: 0, y: 0 },
    tileMap: [],
    steps: 100,
    coins: 0,
    index: i,
    startingTile: 0,
    positionX: 0,
    positionZ: 0,
    positionY: 0.5,
    rotation: 0,
    finished: false,
    setPositionY: (positionY: number, i: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, positionY } : agent)),
      })),
    setStartingTile: (startingTile: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, startingTile } : agent)),
      })),
    setPositionX: (positionX: number, i: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, positionX } : agent)),
      })),
    setPositionZ: (positionZ: number, i: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, positionZ } : agent)),
      })),
    setRotation: (rotation: number, i: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, rotation } : agent)),
      })),
    setFinished: (finished: boolean, i: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, finished } : agent)),
      })),
    setSteps: (steps: number, i: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, steps } : agent)),
      })),
    setPosition: (position: Position, i: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, position } : agent)),
      })),
    setTileMap: (tileMap: { type: TileType; position: Position }[], i: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, tileMap } : agent)),
      })),
    setCoins: (coins: number, i: number) =>
      set((state) => ({
        agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? { ...agent, coins } : agent)),
      })),
  })),
  setAgentEnvironment: (agentEnvironment, i) =>
    set((state) => ({
      agentEnvironment: state.agentEnvironment.map((agent, idx) => (idx === i ? agentEnvironment : agent)),
    })),
  currentAgentIdx: 0,
  setCurrentAgentIdx: (currentAgentIdx) => set(() => ({ currentAgentIdx })),
}))

export default useEnvironment
