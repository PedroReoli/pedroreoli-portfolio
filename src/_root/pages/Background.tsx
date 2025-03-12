"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

interface Connection {
  from: number
  to: number
  opacity: number
}

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationFrameRef = useRef<number>(0)

  // Initialize canvas dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Initialize particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    // Adjust particle count based on screen size for better performance
    const particleCount = Math.min(Math.floor((dimensions.width * dimensions.height) / 15000), 100)

    // Create particles
    particlesRef.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      color: getRandomColor(),
    }))

    // Create initial connections
    updateConnections()

    // Start animation
    startAnimation()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [dimensions])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setIsMouseInCanvas(true)
        setMousePosition({ x, y })
      } else {
        setIsMouseInCanvas(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Get random color from blue/purple palette
  const getRandomColor = () => {
    const colors = [
      "rgba(96, 165, 250, 0.7)", // Blue
      "rgba(147, 197, 253, 0.7)", // Light Blue
      "rgba(59, 130, 246, 0.7)", // Medium Blue
      "rgba(139, 92, 246, 0.7)", // Purple
      "rgba(167, 139, 250, 0.7)", // Light Purple
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Update connections between particles
  const updateConnections = () => {
    const particles = particlesRef.current
    const connections: Connection[] = []
    const connectionDistance = Math.min(dimensions.width, dimensions.height) * 0.15

    // Connect particles that are close to each other
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance
          connections.push({
            from: i,
            to: j,
            opacity: opacity * 0.5, // Adjust opacity based on distance
          })
        }
      }

      // Connect particles to mouse if mouse is in canvas
      if (isMouseInCanvas) {
        const dx = particles[i].x - mousePosition.x
        const dy = particles[i].y - mousePosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const mouseConnectionDistance = connectionDistance * 1.5

        if (distance < mouseConnectionDistance) {
          const opacity = 1 - distance / mouseConnectionDistance
          connections.push({
            from: i,
            to: -1, // -1 indicates connection to mouse
            opacity: opacity * 0.7, // Slightly more visible than particle-particle connections
          })
        }
      }
    }

    connectionsRef.current = connections
  }

  // Animation loop
  const startAnimation = () => {
    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update particles
      particlesRef.current.forEach((particle) => {
        // Move particle
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY *= -1
        }

        // Keep particles within bounds
        particle.x = Math.max(0, Math.min(dimensions.width, particle.x))
        particle.y = Math.max(0, Math.min(dimensions.height, particle.y))
      })

      // Update connections
      updateConnections()

      // Draw connections
      connectionsRef.current.forEach((connection) => {
        const fromParticle = particlesRef.current[connection.from]

        // Determine end point (particle or mouse)
        const toX = connection.to === -1 ? mousePosition.x : particlesRef.current[connection.to].x
        const toY = connection.to === -1 ? mousePosition.y : particlesRef.current[connection.to].y

        ctx.beginPath()
        ctx.moveTo(fromParticle.x, fromParticle.y)
        ctx.lineTo(toX, toY)
        ctx.strokeStyle = `rgba(96, 165, 250, ${connection.opacity})`
        ctx.lineWidth = connection.to === -1 ? 0.8 : 0.5
        ctx.stroke()
      })

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      // Draw mouse point if in canvas
      if (isMouseInCanvas) {
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(147, 197, 253, 0.8)"
        ctx.fill()

        // Draw pulse effect
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, 15, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(147, 197, 253, 0.3)"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-network-gradient"></div>

      {/* Neural network canvas */}
      <motion.canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette"></div>
    </div>
  )
}

export default Background

