"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaYoutube, FaInstagram, FaNewspaper } from "react-icons/fa"
import type React from "react"

const Home = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
      {/* Local section background with subtle glow */}
      <div className="absolute inset-0 bg-[#0A1120]/60 backdrop-blur-sm"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 xxs:px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 xxs:py-10 xs:py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Floating elements with 3D effect */}
        <motion.div
          className="flex flex-col items-center justify-center gap-12 xxs:gap-14 xs:gap-16 sm:gap-18 md:gap-20 lg:gap-24 xl:gap-28"
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
          {/* Main heading */}
          <motion.div
            className="text-center"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: 1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.h1
              className="text-2xl xxs:text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
              variants={{
                hidden: { opacity: 0, y: 20 },
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
              <span className="inline-block relative">
                <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">
                  Olá
                </span>
                <motion.span
                  className="absolute -inset-1 rounded-full blur-sm bg-[#60A5FA]/20"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                ></motion.span>
              </span>{" "}
              <span className="inline-block relative mt-1 xxs:mt-1.5 xs:mt-2 sm:mt-3 md:mt-4">
                <span className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">
                  eu sou o{" "}
                </span>
                <motion.span
                  className="absolute -inset-1 rounded-full blur-sm bg-[#60A5FA]/20"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                ></motion.span>
              </span>
            </motion.h1>

            {/* Name with enhanced special effects */}
            <motion.div
              className="mt-2 xxs:mt-3 xs:mt-4 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <motion.span
                className="relative z-10 text-2xl xxs:text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight bg-gradient-to-r from-[#60A5FA] via-[#93C5FD] to-[#3B82F6] text-transparent bg-clip-text"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% auto", // Corrigido para evitar conflito com backgroundPosition
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
                  // Removido backgroundSize para evitar conflito com backgroundPosition
                }}
              ></motion.div>
            </motion.div>

            {/* Role with typing effect */}
            <motion.div
              className="mt-3 xxs:mt-4 xs:mt-6 sm:mt-8 h-[24px] xxs:h-[28px] xs:h-[32px] sm:h-[40px] md:h-[48px] lg:h-[60px] xl:h-[72px] overflow-hidden"
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
            className="relative"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.6,
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
            ></motion.div>

            {/* Social icons container */}
            <motion.div className="relative flex flex-wrap justify-center items-center gap-2 xxs:gap-2.5 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
              {socialLinks.map((link, index) => (
                <SocialIcon key={index} {...link} index={index} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      ></motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-3 xxs:bottom-4 xs:bottom-5 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-xs xxs:text-sm text-gray-400 mb-1 xxs:mb-2">Scroll para explorar</p>
        <motion.div
          className="w-5 xxs:w-6 h-8 xxs:h-10 border-2 border-[#60A5FA]/50 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1 xxs:w-1.5 h-1 xxs:h-1.5 bg-[#60A5FA] rounded-full mt-2"
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
  const [isDeleting] = useState(false)
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
        className="text-base xxs:text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light"
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
          ></motion.span>
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
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, label }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

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
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block p-2 xxs:p-2.5 xs:p-3 sm:p-3.5 md:p-4 lg:p-5"
        whileHover={{
          scale: 1.1,
          y: -3,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onTapStart={() => setIsClicked(true)}
        onTap={() => {
          setTimeout(() => setIsClicked(false), 300)
        }}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: isHovered
              ? `linear-gradient(120deg, rgba(59, 130, 246, 0.4), rgba(96, 165, 250, 0.7), rgba(59, 130, 246, 0.4))`
              : `linear-gradient(120deg, rgba(59, 130, 246, 0.2), rgba(96, 165, 250, 0.4), rgba(59, 130, 246, 0.2))`,
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : ["0% 0%", "50% 50%"],
          }}
          transition={{
            duration: isHovered ? 2 : 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        ></motion.div>

        {/* Icon */}
        <motion.div
          className="relative z-10 text-lg xxs:text-xl xs:text-2xl sm:text-2xl md:text-3xl text-white"
          animate={{
            color: isHovered ? "#93C5FD" : "rgba(255, 255, 255, 0.9)",
            scale: isHovered ? [1, 1.1, 1] : 1,
            rotate: isHovered ? [0, -5, 5, -3, 0] : 0,
          }}
          transition={{
            duration: isHovered ? 0.5 : 0.3,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
        >
          {icon}
        </motion.div>

        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-md"
          style={{
            background: `radial-gradient(circle, rgba(96, 165, 250, ${isHovered ? 0.5 : 0.2}) 0%, transparent 70%)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0.5,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        ></motion.div>

        {/* Ripple effect on click */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/30"
              initial={{ width: 0, height: 0, opacity: 0.7 }}
              animate={{ width: 80, height: 80, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </motion.a>

      {/* Label tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -bottom-6 xxs:-bottom-7 xs:-bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="block text-[10px] xxs:text-xs sm:text-sm text-white px-2 xxs:px-2.5 xs:px-3 py-1 xxs:py-1.5 rounded-full"
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

