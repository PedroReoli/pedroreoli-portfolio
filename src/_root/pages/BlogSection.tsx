"use client"

import { useRef, useMemo } from "react"
import { motion, useInView, LayoutGroup } from "framer-motion"
import { Tilt } from "react-tilt"
import { ExternalLink, Calendar } from "lucide-react"

const blogs = [
  {
    id: "sql-best-practices",
    title: "Boas Práticas em SQL",
    description:
      "Descubra como boas práticas como BIGINT, IDENTITY e colunas de log podem transformar o design de bancos de dados SQL, garantindo eficiência e escalabilidade.",
    link: "https://devemdesenvolvimento.netlify.app/post/boas-praticas-em-sql",
    date: "15 Fev 2024",
  },
  {
    id: "sql-basics",
    title: "Comandos Iniciais SQL",
    description:
      "Aprenda e pratique os comandos SQL básicos para começar a manipular dados em bancos de dados relacionais com facilidade",
    link: "https://devemdesenvolvimento.netlify.app/post/comandos-iniciais-sql",
    date: "03 Jan 2024",
  },
  {
    id: "oop-systems",
    title: "POO: Estruturando Sistemas Reais",
    description:
      "Aprenda como a Programação Orientada a Objetos (POO) revoluciona o desenvolvimento de software. Com exemplos práticos do mundo real.",
    link: "https://devemdesenvolvimento.netlify.app/post/programao-orientada-a-objetos-estruturando-sistemas-reais",
    date: "22 Dez 2023",
  },
]

// Configurações de Tilt aprimoradas para um efeito mais suave
const defaultTiltOptions = {
  reverse: false,
  max: 12,
  perspective: 1200,
  scale: 1.03,
  speed: 1200,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
}

// Pré-gerar valores aleatórios para evitar recálculos em cada render
const generateNebulaProps = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const colors = [
      "radial-gradient(circle, rgba(147, 197, 253, 0.15) 0%, rgba(96, 165, 250, 0.05) 50%, transparent 80%)",
      "radial-gradient(circle, rgba(196, 181, 253, 0.15) 0%, rgba(167, 139, 250, 0.05) 50%, transparent 80%)",
      "radial-gradient(circle, rgba(249, 168, 212, 0.15) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%)",
    ]

    return {
      background: colors[i % colors.length],
      width: Math.random() * 600 + 400,
      height: Math.random() * 600 + 400,
      top: `${20 + i * 30}%`,
      left: `${20 + i * 20}%`,
      duration: 25 + i * 5,
    }
  })
}

const BlogSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Usando useMemo para evitar recálculos em cada render
  const nebulaProps = useMemo(() => generateNebulaProps(3), [])

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-10 xxs:py-12 xs:py-14 sm:py-16 px-3 xxs:px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden"
    >
      {/* Section background with subtle glow */}
      <div className="absolute inset-0 bg-cosmic-bg/80 backdrop-blur-sm"></div>

      {/* Animated nebula clouds - Pré-calculados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {nebulaProps.map((props, i) => (
          <motion.div
            key={`blog-nebula-${i}`}
            className="absolute rounded-full"
            style={{
              background: props.background,
              width: props.width,
              height: props.height,
              top: props.top,
              left: props.left,
              opacity: 0.4,
              filter: "blur(80px)",
            }}
            animate={{
              scale: [1, 1.1, 0.95, 1.05, 1],
              x: [0, 30, -20, 10, 0],
              y: [0, -30, 20, -10, 0],
              opacity: [0.4, 0.5, 0.3, 0.45, 0.4],
            }}
            transition={{
              duration: props.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-xl xxs:text-2xl xs:text-3xl sm:text-4xl font-bold text-center mb-8 xxs:mb-10 xs:mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          Últimos Posts no Blog<span className="text-cosmic-accent">;</span>
        </motion.h2>

        <LayoutGroup>
          <motion.div
            className="grid grid-cols-1 gap-4 xxs:gap-5 xs:gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            layout
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.1,
                    },
                  },
                }}
                layout
                layoutId={`blog-${blog.id}`}
                className="relative"
              >
                <Tilt options={defaultTiltOptions} className="h-full">
                  <div className="relative group h-full">
                    {/* Improved card glow effect - consistent across all cards */}
                    <div
                      className="absolute -inset-[1px] rounded-xl xxs:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(120deg, rgba(0,0,0,0) 20%, rgba(var(--cosmic-accent-rgb), 0.3) 50%, rgba(0,0,0,0) 80%)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          ease: "linear",
                        }}
                        style={{
                          background:
                            "linear-gradient(120deg, rgba(0,0,0,0) 40%, rgba(var(--cosmic-accent-rgb), 0.4) 50%, rgba(0,0,0,0) 60%)",
                          backgroundSize: "200% 200%",
                        }}
                      />
                    </div>

                    {/* Card content with improved glass effect */}
                    <div className="relative z-10 flex flex-col h-full p-4 xxs:p-5 xs:p-6 sm:p-7 rounded-xl xxs:rounded-2xl border border-cosmic-border backdrop-blur-xl bg-cosmic-card/90 transition-all duration-300 group-hover:bg-cosmic-card/95">
                      {/* Subtle ambient glow inside the card */}
                      <div className="absolute inset-0 rounded-xl xxs:rounded-2xl overflow-hidden">
                        <div className="absolute -inset-[100%] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-cosmic-accent blur-[80px]" />
                      </div>

                      {/* Content container with z-index to appear above effects */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Date */}
                        <div className="flex items-center gap-2 mb-3 text-cosmic-text">
                          <Calendar className="w-3.5 h-3.5 text-cosmic-accent" />
                          <span className="text-xs">{blog.date}</span>
                        </div>

                        {/* Title with improved hover effect */}
                        <h3 className="text-lg xxs:text-xl xs:text-2xl font-bold mb-2 xxs:mb-3 xs:mb-4 text-cosmic-accent group-hover:text-white transition-colors duration-300">
                          {blog.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs xxs:text-sm xs:text-base text-cosmic-text mb-4 xxs:mb-5 xs:mb-6 sm:mb-8 group-hover:text-cosmic-text/90 transition-colors duration-300">
                          {blog.description}
                        </p>

                        {/* Button - Now with improved hover effect */}
                        <div className="mt-auto">
                          <motion.a
                            href={blog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group/link inline-block w-full"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Button glow effect */}
                            <div className="absolute -inset-[1px] rounded-full overflow-hidden">
                              <motion.div
                                className="absolute inset-0 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"
                                animate={{
                                  backgroundPosition: ["0% 0%", "100% 100%"],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "reverse",
                                  ease: "linear",
                                }}
                                style={{
                                  background:
                                    "linear-gradient(90deg, rgba(var(--cosmic-accent-rgb), 0.3) 0%, rgba(var(--cosmic-accent-rgb), 0.6) 50%, rgba(var(--cosmic-accent-rgb), 0.3) 100%)",
                                  backgroundSize: "200% 100%",
                                }}
                              />
                            </div>

                            {/* Button content */}
                            <div className="relative py-2 xxs:py-2.5 xs:py-3 bg-cosmic-card rounded-full border border-cosmic-accent/50 group-hover/link:border-cosmic-accent transition-all duration-300">
                              <div className="flex items-center justify-center gap-2 text-cosmic-accent text-sm xxs:text-base font-medium">
                                Ler mais
                                <ExternalLink className="w-3.5 h-3.5 xxs:w-4 xxs:h-4" />
                              </div>
                            </div>
                          </motion.a>
                        </div>

                        {/* Decorative orbital element with improved animation */}
                        <div className="absolute top-3 right-3 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                          <motion.div
                            className="w-full h-full"
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 20,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          >
                            <div className="w-full h-full border-2 border-cosmic-accent rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-cosmic-accent rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-cosmic-accent rounded-full"></div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  )
}

export default BlogSection

