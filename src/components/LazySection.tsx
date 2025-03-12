"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface LazyLoadingProps {
  children: ReactNode
  threshold?: number
  delay?: number
  className?: string
  placeholderClassName?: string
  placeholderHeight?: string | number
  placeholderWidth?: string | number
  placeholderColor?: string
  fadeInDuration?: number
  slideDistance?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
  showLoadingIndicator?: boolean
  loadingIndicatorColor?: string
  loadingIndicatorSize?: string | number
  onVisible?: () => void
}

const LazySection = ({
  children,
  threshold = 0.1,
  delay = 0.2,
  className = "",
  placeholderClassName = "",
  placeholderHeight = "100%",
  placeholderWidth = "100%",
  placeholderColor = "rgba(15, 23, 42, 0.3)",
  fadeInDuration = 0.6,
  slideDistance = 30,
  direction = "up",
  once = true,
  showLoadingIndicator = true,
  loadingIndicatorColor = "#60A5FA",
  loadingIndicatorSize = 40,
  onVisible,
}: LazyLoadingProps) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    amount: threshold, // Usar 'amount' em vez de 'threshold'
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Determine slide direction
  const getSlideDirection = () => {
    switch (direction) {
      case "up":
        return { y: slideDistance }
      case "down":
        return { y: -slideDistance }
      case "left":
        return { x: slideDistance }
      case "right":
        return { x: -slideDistance }
      default:
        return { y: slideDistance }
    }
  }

  useEffect(() => {
    if (isInView) {
      // Start animation when in view
      setTimeout(() => {
        controls.start({
          opacity: 1,
          ...getSlideDirection(),
          transition: {
            duration: fadeInDuration,
            ease: [0.25, 0.1, 0.25, 1],
          },
        })
        setIsLoaded(true)
        if (onVisible) onVisible()
      }, delay * 1000)
    }
  }, [isInView, controls, delay, fadeInDuration, onVisible])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div
          className={`relative ${placeholderClassName}`}
          style={{
            height: placeholderHeight,
            width: placeholderWidth,
            backgroundColor: placeholderColor,
            borderRadius: "0.5rem",
          }}
        >
          {showLoadingIndicator && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Pulse animation */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundColor: loadingIndicatorColor,
                  }}
                />

                {/* Spinner */}
                <svg
                  width={loadingIndicatorSize}
                  height={loadingIndicatorSize}
                  viewBox="0 0 38 38"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke={loadingIndicatorColor}
                >
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)" strokeWidth="2">
                      <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                      <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 18 18"
                          to="360 18 18"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actual content with animation */}
      <motion.div
        initial={{
          opacity: 0,
          ...(direction === "up"
            ? { y: slideDistance }
            : direction === "down"
              ? { y: -slideDistance }
              : direction === "left"
                ? { x: slideDistance }
                : direction === "right"
                  ? { x: -slideDistance }
                  : { y: slideDistance }),
        }}
        animate={controls}
        style={{
          display: isLoaded ? "block" : "none",
          willChange: "opacity, transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default LazySection

