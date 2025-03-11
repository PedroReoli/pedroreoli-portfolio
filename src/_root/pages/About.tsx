"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Code, Music, BookOpen, Sparkles } from "lucide-react"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const mainControls = useAnimation()
  const [isHovering, setIsHovering] = useState(false)
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null)

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView, mainControls])

  const highlights = [
    { icon: <Code className="w-4 h-4" />, label: "Desenvolvedor" },
    { icon: <Music className="w-4 h-4" />, label: "Músico" },
    { icon: <BookOpen className="w-4 h-4" />, label: "Escritor" },
    { icon: <Sparkles className="w-4 h-4" />, label: "Criativo" },
  ]

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-6 xxs:py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 px-3 xxs:px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative overflow-hidden"
    >
      {/* Section background with cosmic theme */}
      <div className="absolute inset-0 bg-cosmic-bg/80 backdrop-blur-sm"></div>

      {/* Animated stars - Reduzido o número de elementos para melhorar performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 2 + 1
          const colors = ["#F9A8D4", "#C4B5FD", "#93C5FD", "#FFFFFF"]
          const color = colors[i % colors.length]

          return (
            <motion.div
              key={`about-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 3}px ${size}px ${color}`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
              animate={{
                opacity: [Math.random() * 0.7 + 0.3, Math.random() * 0.9 + 0.5, Math.random() * 0.7 + 0.3],
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          )
        })}
      </div>

      {/* Animated nebula - Removido will-change para melhorar performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 filter blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0.1) 40%, transparent 70%)",
            top: "30%",
            left: "20%",
          }}
          animate={{
            scale: [1, 1.1, 0.95, 1.05, 1],
            opacity: [0.2, 0.25, 0.15, 0.25, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-xl xxs:text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-4 xxs:mb-5 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={mainControls}
          transition={{ duration: 0.5 }}
          variants={{
            visible: { opacity: 1, y: 0 },
          }}
        >
          Sobre Mim <span className="text-cosmic-accent">;</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 xxs:gap-5 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Imagem com efeitos aprimorados */}
          <motion.div
            className="w-full max-w-[200px] xxs:max-w-[240px] xs:max-w-[260px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-sm mx-auto lg:mx-0 lg:w-1/3"
            initial={{ opacity: 0, y: 50 }}
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={{
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div
              className="relative aspect-[4/5] rounded-lg xxs:rounded-xl overflow-hidden shadow-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Orbital rings decoration - Simplificado para melhorar performance */}
              <motion.div
                className="absolute w-[150%] h-[150%] border border-cosmic-accent/20 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                animate={{
                  rotate: [0, 360],
                  scale: isHovering ? 1 : 0.8,
                  opacity: isHovering ? 1 : 0.3,
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 0.8, ease: "easeOut" },
                  opacity: { duration: 0.8, ease: "easeOut" },
                }}
              />

              <motion.div
                className="absolute w-[130%] h-[130%] border border-cosmic-accent/15 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                animate={{
                  rotate: [360, 0],
                  scale: isHovering ? 1 : 0.7,
                  opacity: isHovering ? 1 : 0.2,
                }}
                transition={{
                  rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 0.8, ease: "easeOut" },
                  opacity: { duration: 0.8, ease: "easeOut" },
                }}
              />

              {/* Cosmic glow effect */}
              <motion.div
                className="absolute -inset-0.5 rounded-xl z-0"
                animate={{
                  opacity: isHovering ? 1 : 0,
                  scale: isHovering ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  background:
                    "linear-gradient(45deg, rgba(96, 165, 250, 0.4), rgba(147, 197, 253, 0.4), rgba(59, 130, 246, 0.4))",
                  filter: "blur(15px)",
                }}
              />

              {/* Image container with perspective effect - Corrigido para evitar problemas de layout */}
              <div className="relative w-full h-full rounded-xl overflow-hidden transform-gpu perspective-1000">
                <motion.div
                  className="w-full h-full relative"
                  animate={{
                    rotateY: isHovering ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.23, 1, 0.32, 1], // Custom cubic bezier for smooth flip
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front image (black and white) */}
                  <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                    <motion.div
                      className="w-full h-full"
                      animate={{
                        scale: isHovering ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      <img src="/assets/perfilpb.jpg" alt="Pedro Lucas" className="w-full h-full object-cover" />
                    </motion.div>
                  </div>

                  {/* Back image (color) */}
                  <div
                    className="absolute inset-0 backface-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <motion.div
                      className="w-full h-full"
                      animate={{
                        scale: isHovering ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.8 }}
                    >
                      <img
                        src="/assets/perfilcol.jpg"
                        alt="Pedro Lucas Colorido"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Particle effects - Reduzido para melhorar performance */}
              <AnimatePresence>
                {isHovering && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 rounded-full bg-cosmic-accent"
                        initial={{
                          opacity: 0,
                          x: "50%",
                          y: "50%",
                          scale: 0,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, Math.random() * 2 + 1, 0],
                          x: `${50 + (Math.random() * 100 - 50)}%`,
                          y: `${50 + (Math.random() * 100 - 50)}%`,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          duration: Math.random() * 1.5 + 0.5,
                          ease: "easeOut",
                          delay: Math.random() * 0.2,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive caption */}
            <motion.div
              className="mt-3 text-center"
              animate={{ opacity: isHovering ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs xxs:text-sm text-cosmic-text">
                {isHovering ? "Viu só que legal? 😎" : "(passe o mouse na foto)"}
              </p>
            </motion.div>

            {/* Skills badges */}
            <div className="mt-2 xxs:mt-3 xs:mt-4 flex flex-wrap justify-center gap-1 xxs:gap-1.5 xs:gap-2">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveHighlight(index)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  whileHover={{ y: -3 }}
                >
                  <motion.div
                    className="px-2 xxs:px-2.5 py-1 xxs:py-1.5 rounded-full border border-cosmic-border bg-cosmic-card flex items-center gap-1 xxs:gap-1.5 cursor-pointer"
                    animate={{
                      borderColor: activeHighlight === index ? "rgba(96, 165, 250, 0.5)" : "rgba(30, 41, 59, 1)",
                      backgroundColor: activeHighlight === index ? "rgba(15, 23, 42, 0.8)" : "rgba(15, 23, 42, 0.5)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-cosmic-accent">{highlight.icon}</span>
                    <span className="text-[10px] xxs:text-xs font-medium text-cosmic-text">{highlight.label}</span>
                  </motion.div>

                  <AnimatePresence>
                    {activeHighlight === index && (
                      <motion.div
                        className="absolute -inset-0.5 rounded-full blur-sm z-[-1]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: "rgba(96, 165, 250, 0.3)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Texto "Sobre Mim" com melhorias */}
          <motion.div
            className="w-full mt-6 lg:mt-0 lg:w-2/3"
            initial={{ opacity: 0, y: 50 }}
            animate={mainControls}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="space-y-3 xxs:space-y-4 xs:space-y-5 sm:space-y-6">
              {/* Parágrafos com espaçamento melhorado */}
              <div className="relative">
                <motion.div
                  className="absolute -left-2 xxs:-left-3 top-0 h-full w-0.5 xxs:w-1 bg-gradient-to-b from-cosmic-accent/0 via-cosmic-accent/30 to-cosmic-accent/0"
                  initial={{ scaleY: 0 }}
                  animate={mainControls}
                  variants={{
                    visible: { scaleY: 1 },
                  }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                <p className="text-xs xxs:text-sm xs:text-base sm:text-base md:text-lg leading-relaxed text-cosmic-text">
                  Sou <span className="text-cosmic-accent font-medium">Pedro Lucas</span>,{" "}
                  <span className="text-cosmic-accent font-medium">programador júnior</span> movido pela{" "}
                  <span className="text-cosmic-accent font-medium">gana por aprender</span> e pela busca contínua por{" "}
                  <span className="text-cosmic-accent font-medium">inovação</span>. Apesar do{" "}
                  <span className="text-cosmic-accent font-medium">curto tempo de formação</span>, acumulei{" "}
                  <span className="text-cosmic-accent font-medium">experiências valiosas</span> graças à minha dedicação
                  em criar <span className="text-cosmic-accent font-medium">soluções eficientes</span> e{" "}
                  <span className="text-cosmic-accent font-medium">escaláveis</span>. Minha{" "}
                  <span className="text-cosmic-accent font-medium">visão humana</span>, influenciada pela trajetória
                  como <span className="text-cosmic-accent font-medium">músico</span>,{" "}
                  <span className="text-cosmic-accent font-medium">escritor</span> e{" "}
                  <span className="text-cosmic-accent font-medium">professor</span>, me permite unir{" "}
                  <span className="text-cosmic-accent font-medium">criatividade</span> e{" "}
                  <span className="text-cosmic-accent font-medium">tecnologia</span> com sensibilidade.
                </p>
              </div>

              {/* Paragraph 2 with enhanced styling */}
              <div className="relative">
                <motion.div
                  className="absolute -left-3 top-0 h-full w-1 bg-gradient-to-b from-cosmic-accent/0 via-cosmic-accent/30 to-cosmic-accent/0"
                  initial={{ scaleY: 0 }}
                  animate={mainControls}
                  variants={{
                    visible: { scaleY: 1 },
                  }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
                <p className="text-xs xxs:text-sm xs:text-base sm:text-lg leading-relaxed text-cosmic-text">
                  Atualmente, atuo na <span className="text-cosmic-accent font-medium">Autocom3</span>, com foco em{" "}
                  <span className="text-cosmic-accent font-medium">.NET</span>,{" "}
                  <span className="text-cosmic-accent font-medium">C#</span> e{" "}
                  <span className="text-cosmic-accent font-medium">Python</span> para{" "}
                  <span className="text-cosmic-accent font-medium">automação de testes</span>. Também realizo{" "}
                  <span className="text-cosmic-accent font-medium">freelas FullStack</span>, criando{" "}
                  <span className="text-cosmic-accent font-medium">interfaces modernas</span> e{" "}
                  <span className="text-cosmic-accent font-medium">intuitivas</span>. Além disso, desenvolvo{" "}
                  <span className="text-cosmic-accent font-medium">projetos autorais</span>, buscando{" "}
                  <span className="text-cosmic-accent font-medium">renda passiva</span> a longo prazo e a oportunidade
                  de <span className="text-cosmic-accent font-medium">ensinar</span> e{" "}
                  <span className="text-cosmic-accent font-medium">compartilhar experiências</span>.
                </p>
              </div>

              {/* Paragraph 3 with enhanced styling */}
              <div className="relative">
                <motion.div
                  className="absolute -left-3 top-0 h-full w-1 bg-gradient-to-b from-cosmic-accent/0 via-cosmic-accent/30 to-cosmic-accent/0"
                  initial={{ scaleY: 0 }}
                  animate={mainControls}
                  variants={{
                    visible: { scaleY: 1 },
                  }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />
                <p className="text-xs xxs:text-sm xs:text-base sm:text-lg leading-relaxed text-cosmic-text">
                  Meu diferencial é unir <span className="text-cosmic-accent font-medium">arte</span>,{" "}
                  <span className="text-cosmic-accent font-medium">tecnologia</span> e{" "}
                  <span className="text-cosmic-accent font-medium">criatividade</span> para criar{" "}
                  <span className="text-cosmic-accent font-medium">projetos modernos</span> e{" "}
                  <span className="text-cosmic-accent font-medium">escaláveis</span>. Acredito que{" "}
                  <span className="text-cosmic-accent font-medium">compartilhar conhecimento</span> gera{" "}
                  <span className="text-cosmic-accent font-medium">valor</span> e impulsiona a{" "}
                  <span className="text-cosmic-accent font-medium">comunidade</span>.
                </p>
              </div>

              {/* Call to action */}
              <motion.div
                className="pt-2 xxs:pt-3 sm:pt-4"
                initial={{ opacity: 0 }}
                animate={mainControls}
                variants={{
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.5, delay: 1.1 }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

