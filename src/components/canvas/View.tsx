'use client'

import { r3f } from '@/helpers/global'
import { forwardRef, ReactNode, Suspense, useImperativeHandle, useRef } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewDrei } from '@react-three/drei'
import { Vector3 } from 'three'

export const Common = ({
  color,
  camera = { position: new Vector3(0, 0, 6) },
}: {
  color?: string
  camera?: { position: Vector3 }
}) => (
  <Suspense fallback={null}>
    {color && <color attach='background' args={[color]} />}
    {/*@ts-ignore */}
    <ambientLight intensity={2} />
    {/*@ts-ignore */}
    <pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
    {/*@ts-ignore */}
    <PerspectiveCamera makeDefault fov={40} position={camera.position} />
  </Suspense>
)

type ViewProps = {
  children?: ReactNode
  orbit?: boolean
  [key: string]: any
}

const View = forwardRef<ViewProps, any>(({ children, orbit, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <r3f.In>
        <ViewDrei track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewDrei>
      </r3f.In>
    </>
  )
})
View.displayName = 'View'

export { View }
