"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Music, BookOpen, Sparkles, ExternalLink, ChevronRight } from "lucide-react"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-10 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1120]/80 via-[#0F172A]/90 to-[#0A1120]/80 backdrop-blur-sm"></div>

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full border border-blue-500/20"
            style={{
              width: `${(i + 1) * 20}rem`,
              height: `${(i + 1) * 20}rem`,
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              rotate: { duration: 30 + i * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" },
              opacity: { duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" },
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-blue-400/30"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Sobre Mim <span className="text-blue-400">;</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 md:gap-16">
          {/* Profile image column */}
          <motion.div
            className="lg:col-span-2 flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative max-w-xs mx-auto">
              {/* Profile image with effects */}
              <motion.div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Orbital rings decoration */}
                <motion.div
                  className="absolute w-[150%] h-[150%] border border-blue-400/20 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
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
                  className="absolute w-[130%] h-[130%] border border-blue-400/15 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
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

                {/* Image container with perspective effect */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden transform-gpu perspective-1000">
                  <motion.div
                    className="w-full h-full relative"
                    animate={{
                      rotateY: isHovering ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.23, 1, 0.32, 1],
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
              </motion.div>

              {/* Interactive caption */}
              <motion.div
                className="mt-3 text-center"
                animate={{ opacity: isHovering ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-blue-200/80">
                  {isHovering ? "Viu só que legal? 😎" : "(passe o mouse na foto)"}
                </p>
              </motion.div>

              {/* Skills badges */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <motion.div className="px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/30 backdrop-blur-sm flex items-center gap-1.5">
                  <span className="text-blue-400">
                    <Code className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-medium text-blue-100">Desenvolvedor</span>
                </motion.div>
                <motion.div className="px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/30 backdrop-blur-sm flex items-center gap-1.5">
                  <span className="text-blue-400">
                    <Music className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-medium text-blue-100">Músico</span>
                </motion.div>
                <motion.div className="px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/30 backdrop-blur-sm flex items-center gap-1.5">
                  <span className="text-blue-400">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-medium text-blue-100">Escritor</span>
                </motion.div>
                <motion.div className="px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/30 backdrop-blur-sm flex items-center gap-1.5">
                  <span className="text-blue-400">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-medium text-blue-100">Criativo</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content column */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-blue-900/10 backdrop-blur-md rounded-2xl border border-blue-500/20 overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <motion.div
                      className="absolute -left-3 top-0 h-full w-1 bg-gradient-to-b from-blue-400/0 via-blue-400/30 to-blue-400/0"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-blue-100">
                      Sou <span className="text-blue-400 font-medium">Pedro Lucas</span>,{" "}
                      <span className="text-blue-400 font-medium">programador júnior</span> movido pela{" "}
                      <span className="text-blue-400 font-medium">gana por aprender</span> e pela busca contínua por{" "}
                      <span className="text-blue-400 font-medium">inovação</span>.
                    </p>
                  </div>

                  <div className="relative">
                    <motion.div
                      className="absolute -left-3 top-0 h-full w-1 bg-gradient-to-b from-blue-400/0 via-blue-400/30 to-blue-400/0"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-blue-100">
                      Minha <span className="text-blue-400 font-medium">visão humana</span>, influenciada pela
                      trajetória como <span className="text-blue-400 font-medium">músico</span>,{" "}
                      <span className="text-blue-400 font-medium">escritor</span> e{" "}
                      <span className="text-blue-400 font-medium">professor</span>, me permite unir{" "}
                      <span className="text-blue-400 font-medium">criatividade</span> e{" "}
                      <span className="text-blue-400 font-medium">tecnologia</span> com sensibilidade.
                    </p>
                  </div>

                  <div className="relative">
                    <motion.div
                      className="absolute -left-3 top-0 h-full w-1 bg-gradient-to-b from-blue-400/0 via-blue-400/30 to-blue-400/0"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-blue-100">
                      Meu diferencial é unir <span className="text-blue-400 font-medium">arte</span>,{" "}
                      <span className="text-blue-400 font-medium">tecnologia</span> e{" "}
                      <span className="text-blue-400 font-medium">criatividade</span> para criar{" "}
                      <span className="text-blue-400 font-medium">projetos modernos</span> e{" "}
                      <span className="text-blue-400 font-medium">escaláveis</span>.
                    </p>
                  </div>

                  <motion.div
                    className="mt-6 flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.a
                      href="https://devemdesenvolvimento.netlify.app/about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span>Saiba mais</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <motion.div
              className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.a
                href="https://github.com/PedroReoli"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm text-blue-300 hover:text-white hover:bg-blue-600/30 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm text-blue-300 hover:text-white hover:bg-blue-600/30 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="https://devemdesenvolvimento.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm text-blue-300 hover:text-white hover:bg-blue-600/30 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Blog</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

