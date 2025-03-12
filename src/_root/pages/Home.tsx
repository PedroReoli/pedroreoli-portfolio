"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaNewspaper } from "react-icons/fa"
import type React from "react"

const Home = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeIcon, setActiveIcon] = useState<number | null>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section
      ref={ref}
      className="text-white min-h-screen relative flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glowing orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              background: `radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 80%)`,
              width: `${Math.random() * 40 + 20}rem`,
              height: `${Math.random() * 40 + 20}rem`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.2, 0.15],
              x: [0, Math.random() * 20 - 10, 0],
              y: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 8 + i * 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] bg-repeat opacity-5"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          className="flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Main heading with animated text */}
          <motion.div
            className="text-center"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
          >
            <div className="relative">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.span
                  className="inline-block relative"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">
                    Olá
                  </span>
                  <motion.div
                    className="absolute -inset-1 rounded-full blur-md bg-[#60A5FA]/20"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                </motion.span>{" "}
                <motion.span
                  className="inline-block relative mt-2 sm:mt-3"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">
                    eu sou o{" "}
                  </span>
                  <motion.div
                    className="absolute -inset-1 rounded-full blur-md bg-[#60A5FA]/20"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: 0.5,
                    }}
                  />
                </motion.span>
              </motion.h1>
            </div>

            {/* Name with enhanced special effects */}
            <motion.div
              className="mt-4 sm:mt-6 relative inline-block"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span
                className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#3B82F6] text-transparent bg-clip-text"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                Pedro
              </motion.span>
              <motion.div
                className="absolute -inset-4 rounded-2xl blur-xl"
                animate={{
                  opacity: [0.6, 0.8, 0.6],
                  scale: [1, 1.05, 0.98, 1.02, 1],
                }}
                transition={{
                  opacity: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
                style={{
                  background:
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(96, 165, 250, 0.6), rgba(59, 130, 246, 0.3))",
                }}
              />
            </motion.div>

            {/* Role with typing effect */}
            <motion.div
              className="mt-6 sm:mt-8 md:mt-10 h-8 sm:h-10 md:h-12 lg:h-14 overflow-hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.8,
                    delay: 0.6,
                  },
                },
              }}
            >
              <TypewriterEffect text="Desenvolvedor Fullstack Júnior" />
            </motion.div>
          </motion.div>

          {/* Social icons with enhanced hover effects */}
          <motion.div
            className="relative mt-8 sm:mt-12"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.8,
                },
              },
            }}
          >
            {/* Glow effect behind icons */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-3xl rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(0, 0, 0, 0) 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.25, 0.35, 0.25],
              }}
              transition={{
                scale: {
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
                opacity: {
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                },
              }}
            />

            {/* Social icons container */}
            <motion.div className="relative flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              {socialLinks.map((link, index) => (
                <SocialIcon
                  key={index}
                  {...link}
                  index={index}
                  isActive={activeIcon === index}
                  onMouseEnter={() => setActiveIcon(index)}
                  onMouseLeave={() => setActiveIcon(null)}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-sm text-blue-200/80 mb-2 font-light">Scroll para explorar</p>
        <motion.div
          className="w-6 h-10 border-2 border-blue-300/50 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Typewriter effect component
const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isComplete) return

    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex))
        setCurrentIndex((prev) => prev + 1)

        if (currentIndex === text.length + 1) {
          setIsComplete(true)
        }
      }
    }, 100)

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, text, isComplete])

  return (
    <div className="flex items-center h-full">
      <motion.p
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <span className="relative inline-block">
          <span className="relative z-10 bg-gradient-to-r from-blue-200 to-blue-300 text-transparent bg-clip-text">
            {displayText}
          </span>
          <motion.span
            className="inline-block w-[2px] h-[1em] bg-blue-300 ml-1 align-middle"
            animate={{
              opacity: isComplete ? [1, 0, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: isComplete ? Number.POSITIVE_INFINITY : 0,
              repeatType: "reverse",
            }}
          />
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/50 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isComplete ? 1 : displayText.length / text.length,
              opacity: isComplete ? 1 : (displayText.length / text.length) * 0.8,
            }}
            transition={{
              duration: isComplete ? 0.5 : 0.1,
            }}
          />
        </span>
      </motion.p>
    </div>
  )
}

const socialLinks = [
  { href: "mailto:pedrosousa2160@gmail.com", icon: <FaEnvelope />, label: "Email" },
  { href: "https://github.com/PedroReoli", icon: <FaGithub />, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/",
    icon: <FaLinkedin />,
    label: "LinkedIn",
  },
  { href: "https://devemdesenvolvimento.netlify.app/", icon: <FaNewspaper />, label: "Blog" },
  { href: "https://www.youtube.com/@DevDesenvolvimento", icon: <FaYoutube />, label: "YouTube" },
  { href: "https://www.instagram.com/01_dev_em_desenvolvimento", icon: <FaInstagram />, label: "Instagram" },
  { href: "https://x.com/opedroreoli", icon: <FaTwitter />, label: "Twitter" },
]

interface SocialIconProps {
  href: string
  icon: React.ReactNode
  label: string
  index: number
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, label, index, isActive, onMouseEnter, onMouseLeave }) => {
  return (
    <motion.div
      className="relative"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block p-3 sm:p-4"
        whileHover={{
          scale: 1.1,
          y: -3,
        }}
        whileTap={{
          scale: 0.95,
        }}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: isActive
              ? `linear-gradient(120deg, rgba(59, 130, 246, 0.6), rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.6))`
              : `linear-gradient(120deg, rgba(59, 130, 246, 0.3), rgba(96, 165, 250, 0.5), rgba(59, 130, 246, 0.3))`,
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: isActive ? ["0% 0%", "100% 100%"] : ["0% 0%", "50% 50%"],
          }}
          transition={{
            duration: isActive ? 2 : 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10 text-xl sm:text-2xl md:text-3xl text-white"
          animate={{
            color: isActive ? "#93C5FD" : "rgba(255, 255, 255, 0.9)",
            scale: isActive ? [1, 1.1, 1] : 1,
            rotate: isActive ? [0, -5, 5, -3, 0] : 0,
          }}
          transition={{
            duration: isActive ? 0.5 : 0.3,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        >
          {icon}
        </motion.div>

        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md"
          style={{
            background: `radial-gradient(circle, rgba(96, 165, 250, ${isActive ? 0.5 : 0.2}) 0%, transparent 70%)`,
          }}
          animate={{
            opacity: isActive ? 1 : 0.5,
            scale: isActive ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.a>

      {/* Label tooltip */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="block text-xs sm:text-sm text-white px-2.5 py-1.5 rounded-full"
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(96, 165, 250, 0.3)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(96, 165, 250, 0.3)",
              }}
            >
              {label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Home

