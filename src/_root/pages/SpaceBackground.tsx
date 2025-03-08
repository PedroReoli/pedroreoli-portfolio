"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

// Custom hook for mouse and scroll tracking
function useMotionTracking() {
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const scrollY = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX - window.innerWidth / 2) / window.innerWidth
      mouseY.current = (e.clientY - window.innerHeight / 2) / window.innerHeight
    }

    const handleScroll = () => {
      scrollY.current = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return { mouseX, mouseY, scrollY }
}

// Simple camera controller
function CameraController({ 
  mouseX, 
  mouseY, 
  scrollY 
}: {
  mouseX: React.MutableRefObject<number>
  mouseY: React.MutableRefObject<number>
  scrollY: React.MutableRefObject<number>
}) {
  const { camera } = useThree()
  
  useFrame(() => {
    // Simple camera movement based on mouse position
    camera.position.x += (mouseX.current * 2 - camera.position.x) * 0.05
    camera.position.y += (-mouseY.current * 2 - camera.position.y) * 0.05
    
    // Simple zoom effect based on scroll
    const targetZ = 20 - scrollY.current * 5
    camera.position.z += (targetZ - camera.position.z) * 0.05
    
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Simple planet
function Planet({ 
  position, 
  size, 
  rotationSpeed, 
  hasRings, 
  color 
}: {
  position: [number, number, number]
  size: number
  rotationSpeed: number
  hasRings: boolean
  color: string
}) {
  const planetRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }

    if (ringsRef.current && hasRings) {
      ringsRef.current.rotation.z += rotationSpeed * 0.2
    }

    // Add simple floating movement to the planet
    if (planetRef.current) {
      const time = state.clock.elapsedTime
      planetRef.current.position.y += Math.sin(time * 0.2) * 0.01 * size
      planetRef.current.position.x += Math.cos(time * 0.15) * 0.005 * size
    }
  })

  return (
    <group position={position}>
      <group ref={planetRef}>
        {/* Planet sphere */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            metalness={0.2} 
            roughness={0.8}
          />
        </mesh>

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
    </group>
  )
}

// Simple crescent moon
function CrescentMoon({ 
  position, 
  size 
}: {
  position: [number, number, number]
  size: number
}) {
  const moonRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (moonRef.current) {
      const time = state.clock.elapsedTime
      // Add gentle floating motion
      moonRef.current.position.y += Math.sin(time * 0.15) * 0.01
      moonRef.current.position.x += Math.cos(time * 0.1) * 0.005
      // Slow rotation to maintain crescent appearance
      moonRef.current.rotation.y = Math.sin(time * 0.05) * 0.1 + 0.4
    }
  })

  return (
    <group position={position}>
      <group ref={moonRef}>
        {/* Main moon sphere */}
        <mesh castShadow>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color="#E6E6E6" metalness={0.1} roughness={0.8} />
        </mesh>
        
        {/* Overlapping dark sphere to create crescent effect */}
        <mesh position={[size * 0.4, 0, 0]}>
          <sphereGeometry args={[size * 1.05, 32, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={1} />
        </mesh>
      </group>
    </group>
  )
}

// Planet system
function PlanetSystem() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      // Add subtle overall movement to the planet system
      groupRef.current.rotation.y = Math.sin(time * 0.03) * 0.01
      groupRef.current.rotation.x = Math.cos(time * 0.02) * 0.005
    }
  })
  
  // Define planets with different properties
  const planets = [
    {
      position: [-15, 5, -15] as [number, number, number],
      size: 2.5,
      color: "#4B9CD3", // Blue planet
      rotationSpeed: 0.005,
      hasRings: false
    },
    {
      position: [10, -7, -12] as [number, number, number],
      size: 3.5,
      color: "#E27B58", // Orange/red planet
      rotationSpeed: 0.003,
      hasRings: false
    },
    {
      position: [-10, -8, -10] as [number, number, number],
      size: 4,
      color: "#CD853F", // Brown/orange planet
      rotationSpeed: 0.002,
      hasRings: true
    },
    {
      position: [5, 10, -8] as [number, number, number],
      size: 1.8,
      color: "#9370DB", // Purple planet
      rotationSpeed: 0.004,
      hasRings: false
    },
    {
      position: [-5, 12, -20] as [number, number, number],
      size: 2,
      color: "#20B2AA", // Teal planet
      rotationSpeed: 0.0035,
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
          color={planet.color}
        />
      ))}
    </group>
  )
}

// Main component
export default function SpaceBackground() {
  const { mouseX, mouseY, scrollY } = useMotionTracking()

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // Responsive to device pixel ratio
        camera={{ position: [0, 0, 20], fov: 50, near: 0.1, far: 1000 }}
        style={{ background: 'transparent' }}
      >
        {/* Simple camera controller */}
        <CameraController 
          mouseX={mouseX} 
          mouseY={mouseY} 
          scrollY={scrollY} 
        />
        
        {/* Basic lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.2} />
        
        {/* Planet system */}
        <PlanetSystem />
        
        {/* Crescent moon */}
        <CrescentMoon position={[12, 8, -10]} size={3} />
      </Canvas>
    </div>
  )
}
