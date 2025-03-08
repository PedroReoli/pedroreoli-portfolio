"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"


// Define proper types for props
interface SpaceSceneProps {
  mouseX?: number
  mouseY?: number
  scrollYProgress?: number
}

export default function SpaceScene({ mouseX = 0, mouseY = 0, scrollYProgress = 0 }: SpaceSceneProps) {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 15], fov: 50, near: 0.01, far: 1000 }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Simple stars implementation without using drei */}
        <SimpleStars count={5000} />

        {/* Camera controller that responds to mouse and scroll */}
        <CameraController mouseX={mouseX} mouseY={mouseY} scrollYProgress={scrollYProgress} />

        {/* Planets */}
        <PlanetSystem />
      </Canvas>
    </div>
  )
}

// Simple stars implementation without using drei
function SimpleStars({ count = 5000 }) {
  const positions = useRef<Float32Array>()
  const sizes = useRef<Float32Array>()
  
  if (!positions.current) {
    positions.current = new Float32Array(count * 3)
    sizes.current = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions.current[i3] = (Math.random() - 0.5) * 200
      positions.current[i3 + 1] = (Math.random() - 0.5) * 200
      positions.current[i3 + 2] = (Math.random() - 0.5) * 200
      sizes.current[i] = Math.random() * 2
    }
  }
  
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes.current}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        sizeAttenuation
        color="white"
        transparent
        opacity={0.8}
      />
    </points>
  )
}

interface CameraControllerProps {
  mouseX: number
  mouseY: number
  scrollYProgress: number
}

function CameraController({ mouseX, mouseY, scrollYProgress }: CameraControllerProps) {
  const { camera } = useThree()

  // Set initial camera position
  useEffect(() => {
    camera.position.set(0, 0, 20)
    camera.lookAt(0, 0, 0)

    // Set camera properties if it's a perspective camera
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 60
      camera.updateProjectionMatrix()
    }
  }, [camera])

  // Subtle camera movement based on mouse position and scroll
  useFrame(() => {
    // Mouse movement effect
    camera.position.x += (mouseX * 0.01 - camera.position.x) * 0.05
    camera.position.y += (mouseY * 0.01 - camera.position.y) * 0.05
    
    // Subtle zoom effect based on scroll
    const targetZ = 20 - scrollYProgress * 2
    camera.position.z += (targetZ - camera.position.z) * 0.05
    
    camera.lookAt(0, 0, 0)
  })

  return null
}

function PlanetSystem() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Add subtle overall movement to the planet system
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.02
      groupRef.current.rotation.x = Math.cos(time * 0.04) * 0.01
    }
  })
  
  // Define some fixed planets instead of random generation
  const planets = [
    {
      position: [-15, 8, -10] as [number, number, number],
      size: 3,
      color: "#4B9CD3",
      rotationSpeed: 0.005,
      hasAtmosphere: true,
      atmosphereColor: "#88CCFF",
      hasRings: false
    },
    {
      position: [15, 10, -15] as [number, number, number],
      size: 4,
      color: "#E27B58",
      rotationSpeed: 0.003,
      hasAtmosphere: false,
      atmosphereColor: "",
      hasRings: false
    },
    {
      position: [-18, -10, -12] as [number, number, number],
      size: 5,
      color: "#CD853F",
      rotationSpeed: 0.002,
      hasAtmosphere: false,
      atmosphereColor: "",
      hasRings: true
    },
    {
      position: [16, -8, -10] as [number, number, number],
      size: 2.5,
      color: "#9370DB",
      rotationSpeed: 0.004,
      hasAtmosphere: true,
      atmosphereColor: "#B19CD9",
      hasRings: false
    }
  ]
  
  return (
    <group ref={groupRef}>
      {planets.map((planet, index) => (
        <Planet
          key={index}
          position={planet.position}
          size={planet.size}
          rotationSpeed={planet.rotationSpeed}
          hasRings={planet.hasRings}
          hasAtmosphere={planet.hasAtmosphere}
          color={planet.color}
          atmosphereColor={planet.atmosphereColor}
        />
      ))}
    </group>
  )
}

interface PlanetProps {
  position: [number, number, number]
  size: number
  rotationSpeed: number
  hasRings: boolean
  hasAtmosphere: boolean
  color: string
  atmosphereColor: string
}

function Planet({ 
  position, 
  size, 
  rotationSpeed, 
  hasRings, 
  hasAtmosphere, 
  color, 
  atmosphereColor 
}: PlanetProps) {
  const planetRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)
  
  // Animate planet rotation with a subtle floating effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }

    if (ringsRef.current && hasRings) {
      ringsRef.current.rotation.x = Math.PI / 4
      ringsRef.current.rotation.y += rotationSpeed * 0.5
    }

    // Add slight floating movement to the entire planet group
    if (planetRef.current) {
      // Use a unique offset based on position to create varied movement
      const offset = (position[0] + position[1] + position[2]) * 0.01
      planetRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.2 + offset) * 0.01 * size
      planetRef.current.position.x += Math.cos(state.clock.elapsedTime * 0.15 + offset) * 0.005 * size
    }
  })

  return (
    <group position={position} ref={planetRef}>
      {/* Planet sphere */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.2} 
          roughness={0.8}
        />
      </mesh>

      {/* Atmosphere glow */}
      {hasAtmosphere && (
        <mesh>
          <sphereGeometry args={[size * 1.15, 32, 32]} />
          <meshBasicMaterial
            color={atmosphereColor}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Saturn-like rings */}
      {hasRings && (
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
            <meshBasicMaterial
              color="#A88F6A"
              side={THREE.DoubleSide}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}
