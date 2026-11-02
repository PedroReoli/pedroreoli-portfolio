import { AdaptiveDpr, Float, MeshDistortMaterial } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import { MathUtils } from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function OrbitalCore({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)
  const { pointer } = useThree()
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => {
        const angle = (index / 26) * Math.PI * 2
        const radius = 2.3 + (index % 4) * 0.18
        return {
          position: [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.58, (index % 5) * 0.18 - 0.4] as const,
          scale: 0.025 + (index % 3) * 0.012,
        }
      }),
    [],
  )

  useFrame((state, delta) => {
    if (!group.current || !core.current || reducedMotion) return
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, pointer.y * 0.12, 0.04)
    group.current.rotation.z = MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.1, 0.04)
    core.current.rotation.x = state.clock.elapsedTime * 0.16
    core.current.rotation.y = state.clock.elapsedTime * 0.22
  })

  return (
    <group ref={group} rotation={[0.16, -0.32, -0.12]}>
      <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.3} floatIntensity={0.42}>
        <mesh ref={core} castShadow>
          <icosahedronGeometry args={[1.32, 2]} />
          <MeshDistortMaterial
            color="#ff5a36"
            emissive="#7a1607"
            emissiveIntensity={0.55}
            roughness={0.28}
            metalness={0.72}
            distort={reducedMotion ? 0 : 0.2}
            speed={1.4}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.8, 0.3, 0]}>
        <torusGeometry args={[2.15, 0.035, 12, 160]} />
        <meshStandardMaterial color="#62d9ff" emissive="#62d9ff" emissiveIntensity={2.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, -0.42, Math.PI / 2]}>
        <torusGeometry args={[1.78, 0.02, 10, 140]} />
        <meshStandardMaterial color="#f4f0e7" emissive="#315efb" emissiveIntensity={1.2} />
      </mesh>
      <mesh rotation={[0.25, 0.9, 0.5]}>
        <torusGeometry args={[2.62, 0.012, 8, 160]} />
        <meshBasicMaterial color="#45516d" transparent opacity={0.72} />
      </mesh>

      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={index % 4 === 0 ? '#ff5a36' : '#f4f0e7'} />
        </mesh>
      ))}
    </group>
  )
}

export function HeroScene({ topLabel, bottomLabel }: { topLabel: string; bottomLabel: string }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.42} />
        <directionalLight position={[3, 5, 4]} intensity={3.2} color="#f4f0e7" />
        <pointLight position={[-3, -1, 3]} intensity={28} distance={8} color="#315efb" />
        <pointLight position={[3, 1, 3]} intensity={20} distance={7} color="#ff5a36" />
        <OrbitalCore reducedMotion={reducedMotion} />
      </Canvas>
      <div className="hero-scene__hud hero-scene__hud--top">{topLabel}</div>
      <div className="hero-scene__hud hero-scene__hud--bottom">{bottomLabel}</div>
    </div>
  )
}
