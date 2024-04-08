import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, Uniform } from 'three'
import { fragment } from './shaders/hologram/fragment'
import { vertex } from './shaders/hologram/vertex'
import { useFrame } from '@react-three/fiber'

export default function HologramMaterial() {
  // const customMaterial = useMemo(() => {
  //   const material = new MeshPhysicalMaterial({
  //     color: '#444444',
  //     metalness: 0.5,
  //     roughness: 0.4,
  //     reflectivity: 0.8,
  //     clearcoat: 1.0,
  //     clearcoatRoughness: 0.05,
  //     ior: 1.5,
  //     iridescence: 1.6,
  //   })
  //   return material
  // }, [])

  // customMaterial.onBeforeCompile = (shader) => {
  //   shader.uniforms.spikeHeight = { value: 1.0 }
  //   shader.uniforms.spikeFrequency = { value: 1.0 }
  //   shader.vertexShader = shader.vertexShader
  //     .replace(
  //       'void main() {',
  //       `
  //       uniform float spikeHeight;
  //       uniform float spikeFrequency;
  //       void main() {
  //       `,
  //     )
  //     .replace(
  //       'varying vec3 vViewPosition;',
  //       `varying vec3 vViewPosition;
  //         varying vec2 vUv;
  //     `,
  //     )

  //   console.log(shader.vertexShader)

  //   shader.fragmentShader = `${shader.fragmentShader}`
  // }

  const material = new ShaderMaterial({
    uniforms: {
      uTime: new Uniform(0),
      uColor: new Uniform(new Color('#70c1ff')),
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    blending: AdditiveBlending,
  })

  useFrame((state, delta) => {
    material.uniforms.uTime.value = state.clock.getElapsedTime()
  })

  return <primitive object={material} attach='material' />
}
