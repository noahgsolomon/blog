export default function Plum() {
  return (
    /*@ts-ignore*/
    <mesh castShadow position-y={0.5}>
      <capsuleGeometry args={[0.1, 0.15, 10, 50]} />
      <meshStandardMaterial flatShading color={'#7c62ff'} />
    </mesh>
  )
}
