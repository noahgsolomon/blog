export default function Lights() {
  return (
    <>
      <directionalLight
        /*@ts-ignore */
        castShadow
        intensity={2}
        position={[-4, 5, 0]}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={200}
        shadow-camera-top={30}
        shadow-camera-right={30}
        shadow-camera-bottom={-30}
        shadow-camera-left={-30}
        color={'#ffffff'}
      />
      {/*@ts-ignore */}
      <ambientLight intensity={2.5} />
    </>
  )
}
