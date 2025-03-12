"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUp } from "lucide-react"

const End = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="text-white min-h-screen py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1120]/90 via-[#0F172A]/80 to-[#0A1120]/90 backdrop-blur-sm"></div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] bg-repeat opacity-5"></div>

        {/* Animated stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`end-star-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: "#60A5FA",
              boxShadow: `0 0 ${Math.random() * 4 + 2}px ${Math.random() * 2 + 1}px #60A5FA`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.7 + 0.5, Math.random() * 0.5 + 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Glowing orb */}
        <motion.div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(96, 165, 250, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 80%)`,
            width: "40rem",
            height: "40rem",
            top: "50%",
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

      <motion.div
        className="text-center w-full max-w-xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Profile image with orbital ring */}
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          initial={{ scale: 0.8 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            {/* Orbital ring */}
            <motion.div
              className="absolute -inset-3 rounded-full pointer-events-none opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(96, 165, 250, 0)" />
                    <stop offset="50%" stopColor="rgba(96, 165, 250, 0.6)" />
                    <stop offset="100%" stopColor="rgba(96, 165, 250, 0)" />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="50" rx="48" ry="48" fill="none" stroke="url(#orbitalGradient)" strokeWidth="0.5" />
              </svg>
            </motion.div>

            <img
              src="/assets/Eu.svg"
              alt="Despedida"
              className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-blue-500/30 hover:border-blue-400 transition-colors duration-300"
            />
          </div>
        </motion.div>

        {/* Title with animated accent */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Obrigado por visitar
          <motion.span
            className="ml-2 text-blue-400 inline-block"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          >
            !
          </motion.span>
        </motion.h2>

        {/* Text */}
        <motion.p
          className="text-blue-200/80 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 md:mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Espero que tenha gostado do meu portfólio! Fique à vontade para voltar ao início ou visitar novamente sempre
          que desejar. Desejo tudo de melhor em seus projetos!
        </motion.p>

        {/* Button with interactive effects */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group relative inline-flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-900/30 rounded-full border border-blue-500/30 group-hover:border-blue-400 transition-all duration-300 flex items-center gap-2">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            >
              <ArrowUp className="w-4 sm:w-5 h-4 sm:h-5 text-blue-400 group-hover:text-white transition-colors duration-300" />
            </motion.div>
            <span className="text-sm sm:text-base text-blue-400 group-hover:text-white transition-colors duration-300">
              Voltar ao Início
            </span>
          </div>
        </motion.button>

        {/* Decorative line */}
        <motion.div
          className="mt-12 sm:mt-16 opacity-60"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 0.6, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default End

