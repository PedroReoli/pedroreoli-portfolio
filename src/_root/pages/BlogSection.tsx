"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
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

const BlogSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1120]/90 via-[#0F172A]/80 to-[#0A1120]/90 backdrop-blur-sm"></div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] bg-repeat opacity-5"></div>

        {/* Glowing orb */}
        <motion.div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 80%)`,
            width: "40rem",
            height: "40rem",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Últimos Posts no Blog<span className="text-blue-400">;</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
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
              className="group relative"
            >
              <div className="relative bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden h-full transition-all duration-300 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3 text-blue-300/80">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-xs">{blog.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-blue-400 group-hover:text-white transition-colors duration-300">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-blue-200/80 mb-5 line-clamp-3">{blog.description}</p>

                  {/* Button */}
                  <div className="mt-auto">
                    <motion.a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span>Ler mais</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default BlogSection

