"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
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

// Main component
export default function SpaceBackground() {
  const { mouseX, mouseY, scrollY } = useMotionTracking()
  const [isVisible, setIsVisible] = useState(true)
  const [quality, setQuality] = useState("high")

  useEffect(() => {
    // Check device capabilities
    const checkPerformance = () => {
      if (
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ) {
        setQuality("low")
      }

      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        setQuality("low")
      }
    }

    checkPerformance()
  }, [])

  // Handle WebGL context loss
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  // Don't render if not visible to prevent context loss
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "default", // Changed from high-performance to default for better stability
          preserveDrawingBuffer: true, // Add this to help with context preservation
        }}
        dpr={[1, quality === "high" ? 1.5 : 1]} // Reduce DPR for low-end devices
        camera={{
          position: [0, 0, 25],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        style={{ background: "transparent" }}
        className="xxs:opacity-80 xs:opacity-90 sm:opacity-100"
      >
        <CameraController mouseX={mouseX} mouseY={mouseY} scrollY={scrollY} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 0, -30]} intensity={1.5} color="#FFF8DC" />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.2} />
        <pointLight position={[0, 0, -30]} intensity={2} color="#FFF8DC" distance={100} decay={2} />
        <TexturedPlanetSystem quality={quality} />
      </Canvas>
    </div>
  )
}

function CameraController({
  mouseX,
  mouseY,
  scrollY,
}: {
  mouseX: React.MutableRefObject<number>
  mouseY: React.MutableRefObject<number>
  scrollY: React.MutableRefObject<number>
}) {
  const { camera } = useThree()
  const { scene } = useThree()
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  // Detect screen size for responsive adjustments
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useFrame(() => {
    // Adjust mouse sensitivity based on screen size
    const mouseSensitivity = windowWidth < 425 ? 0.01 : windowWidth < 768 ? 0.02 : 0.03

    // Adjust zoom based on screen size
    const zoomFactor = windowWidth < 425 ? 5 : windowWidth < 768 ? 7 : 10

    // Subtle camera movement based on mouse position
    camera.position.x += (mouseX.current * 1.5 - camera.position.x) * mouseSensitivity
    camera.position.y += (-mouseY.current * 1.5 - camera.position.y) * mouseSensitivity

    // Enhanced zoom effect - camera moves closer and planets move forward
    const targetZ = windowWidth < 425 ? 30 : windowWidth < 768 ? 28 : 25
    const scrollEffect = scrollY.current * zoomFactor
    camera.position.z += (targetZ - scrollEffect - camera.position.z) * 0.05

    // Move planets closer to user when zooming
    scene.traverse((object) => {
      if (object.userData.isPlanet) {
        const originalZ = object.userData.originalZ || 0
        object.position.z = originalZ + scrollY.current * zoomFactor
      }
    })

    camera.lookAt(0, 0, 0)
  })

  return null
}

function TexturedPlanetSystem({ quality }: { quality: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)

  // Detect screen size for responsive adjustments
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Only update rotation if the group is visible in the camera frustum
      if (state.camera.position.z < 50) {
        // Only animate when camera is close enough
        const time = state.clock.elapsedTime
        groupRef.current.rotation.y = Math.sin(time * 0.01) * 0.005
      }
    }
  })

  // Adjust planet positions based on screen size
  const getPositionScale = () => {
    if (windowWidth < 425) return 0.6 // xxs, xs, sm
    if (windowWidth < 768) return 0.8 // md
    return 1 // lg, xl, 2xl
  }

  const positionScale = getPositionScale()

  // Define planets with textures - more spaced out and with realistic sizes
  const planets = [
    {
      name: "Earth",
      position: [-8 * positionScale, 0, 0] as [number, number, number],
      size: 1 * (windowWidth < 425 ? 0.8 : 1),
      rotationSpeed: 0.005,
      hasRings: false,
      texturePath: "/textures/Earth.jpg",
      tilt: 23.5,
      floatIntensity: 0.05,
      floatSpeed: 1,
    },
    {
      name: "Mars",
      position: [-4 * positionScale, 0, 2 * positionScale] as [number, number, number],
      size: 0.53 * (windowWidth < 425 ? 0.8 : 1),
      rotationSpeed: 0.004,
      hasRings: false,
      texturePath: "/textures/Mars.jpg",
      tilt: 25,
      floatIntensity: 0.07,
      floatSpeed: 1.2,
    },
    {
      name: "Moon",
      position: [-10 * positionScale, 0, 3 * positionScale] as [number, number, number],
      size: 0.27 * (windowWidth < 425 ? 0.8 : 1),
      rotationSpeed: 0.002,
      hasRings: false,
      texturePath: "/textures/Moon.jpg",
      tilt: 1.5,
      floatIntensity: 0.08,
      floatSpeed: 0.9,
    },
    {
      name: "Saturn",
      position: [10 * positionScale, 0, 0] as [number, number, number],
      size: 2 * (windowWidth < 425 ? 0.8 : 1),
      rotationSpeed: 0.003,
      hasRings: true,
      texturePath: "/textures/Saturn.jpg",
      ringTexturePath: "/textures/Saturn_Ring.jpg",
      tilt: 26.7,
      floatIntensity: 0.03,
      floatSpeed: 0.7,
    },
  ]

  return (
    <group ref={groupRef}>
      {/* Sun in the background */}
      <TexturedPlanet
        position={[0, 0, -30 * positionScale]}
        size={10 * (windowWidth < 425 ? 0.7 : windowWidth < 768 ? 0.85 : 1)}
        rotationSpeed={0.001}
        hasRings={false}
        texturePath="/textures/Sun.jpg"
        tilt={7.25}
        floatIntensity={0.01}
        floatSpeed={0.5}
        name="Sun"
        quality={quality}
      />

      {/* Other planets */}
      {planets.map((planet, index) => (
        <TexturedPlanet
          key={index}
          position={planet.position}
          size={planet.size}
          rotationSpeed={planet.rotationSpeed}
          hasRings={planet.hasRings}
          texturePath={planet.texturePath}
          ringTexturePath={planet.ringTexturePath}
          tilt={planet.tilt}
          floatIntensity={planet.floatIntensity}
          floatSpeed={planet.floatSpeed}
          name={planet.name}
          quality={quality}
        />
      ))}
    </group>
  )
}

// Custom hook to load texture with error handling
function useTexture(path: string | undefined) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadTexture = useCallback(async (texturePath: string) => {
    setLoading(true)
    setError(false)
    try {
      const textureLoader = new THREE.TextureLoader()
      const loadedTexture = await new Promise<THREE.Texture>((resolve, reject) => {
        textureLoader.load(
          texturePath,
          (tex) => resolve(tex),
          undefined,
          (event) => reject(event),
        )
      })
      setTexture(loadedTexture)
    } catch (err) {
      console.error(`Error loading texture ${texturePath}:`, err)
      setError(true)
      setTexture(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!path) {
      setTexture(null)
      setLoading(false)
      setError(false)
      return
    }

    loadTexture(path)
  }, [path, loadTexture])

  return { texture, loading, error }
}

// Planet with texture
function TexturedPlanet({
  position,
  size,
  rotationSpeed,
  hasRings,
  texturePath,
  ringTexturePath,
  tilt = 0,
  floatIntensity = 0.05,
  floatSpeed = 1,
  name = "",
  quality,
}: {
  position: [number, number, number]
  size: number
  rotationSpeed: number
  hasRings: boolean
  texturePath: string
  ringTexturePath?: string
  tilt?: number
  floatIntensity?: number
  floatSpeed?: number
  name?: string
  quality: string
}) {
  const planetRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const ringsRef = useRef<THREE.Group>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Load planet texture
  const { texture: planetTexture, loading: planetLoading, error: planetError } = useTexture(texturePath)

  // Load ring texture if needed
  const { texture: ringTexture, loading: ringLoading, error: ringError } = useTexture(ringTexturePath)

  // Store original position for zoom effect
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.userData.isPlanet = true
      groupRef.current.userData.originalZ = position[2]
      groupRef.current.userData.name = name
    }
  }, [position, name])

  // Apply tilt to the planet
  useEffect(() => {
    if (planetRef.current) {
      planetRef.current.rotation.x = THREE.MathUtils.degToRad(tilt)
    }
  }, [tilt])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed
    }

    if (ringsRef.current && hasRings) {
      ringsRef.current.rotation.z += rotationSpeed * 0.2
    }

    // Add gentle floating movement to the planet (only in its own axis)
    if (planetRef.current) {
      const time = state.clock.elapsedTime
      // Very subtle movement that doesn't change position much
      const floatY = Math.sin(time * 0.2 * floatSpeed) * 0.01 * floatIntensity
      planetRef.current.position.y = floatY
    }
  })

  return (
    <group position={position} ref={groupRef}>
      <group ref={planetRef}>
        {/* Planet sphere */}
        <mesh ref={meshRef} castShadow receiveShadow>
          <sphereGeometry args={[size, quality === "high" ? 32 : 16, quality === "high" ? 32 : 16]} />
          {planetTexture && !planetLoading && !planetError ? (
            <meshStandardMaterial map={planetTexture} metalness={0.2} roughness={0.8} />
          ) : (
            <meshStandardMaterial color="#CCCCCC" metalness={0.2} roughness={0.8} />
          )}
        </mesh>

        {/* Saturn-like rings */}
        {hasRings && ringTexture && !ringLoading && !ringError ? (
          <group ref={ringsRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[size * 1.4, size * 2.2, 32]} />
              <meshBasicMaterial map={ringTexture} side={THREE.DoubleSide} transparent opacity={0.9} />
            </mesh>
          </group>
        ) : hasRings ? (
          <group ref={ringsRef}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[size * 1.4, size * 2.2, 32]} />
              <meshBasicMaterial color="#A88F6A" side={THREE.DoubleSide} transparent opacity={0.7} />
            </mesh>
          </group>
        ) : null}
      </group>
    </group>
  )
}

