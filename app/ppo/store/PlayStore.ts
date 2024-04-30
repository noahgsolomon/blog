import { create } from 'zustand'
import * as THREE from 'three'

interface PlayState {
  currentPosition: number
  setCurrentPosition: (position: number) => void
  currentPlayPosition: number
  setCurrentPlayPosition: (position: number) => void
  focus: THREE.Vector3
  setFocus: (focus: THREE.Vector3) => void
  look: THREE.Vector3
  setLook: (look: THREE.Vector3) => void
}

const usePlayStore = create<PlayState>((set) => ({
  currentPosition: 0,
  setCurrentPosition: (position: number) => set({ currentPosition: position }),
  currentPlayPosition: -1,
  setCurrentPlayPosition: (position: number) => set({ currentPlayPosition: position }),
  focus: new THREE.Vector3(),
  setFocus: (focus: THREE.Vector3) => set({ focus }),
  look: new THREE.Vector3(),
  setLook: (look: THREE.Vector3) => set({ look }),
}))

export default usePlayStore
