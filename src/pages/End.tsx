"use client"

import { motion } from "framer-motion"
import { HandIcon as HandWaving, ArrowUp, Sparkles, Heart } from "lucide-react"

const End = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent flex flex-col items-center justify-center overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Subtle animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/30"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              opacity: 0.3,
            }}
            animate={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
        {/* SVG Image with enhanced styling */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-blue-500/50 p-1 flex items-center justify-center overflow-hidden bg-gray-900/50 shadow-lg shadow-blue-500/10 group">
            <img
              src="/assets/Eu.svg"
              alt="Ilustração"
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />

            {/* Enhanced inner border with glow */}
            <div className="absolute inset-0 rounded-full border border-blue-500/20"></div>

            {/* Subtle rotating glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Decorative dots */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500/30 blur-sm"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-blue-500/20 blur-sm"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Thank You Title with HandWaving icon background */}
        <div className="relative mb-8">
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-10 text-blue-400"
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HandWaving className="w-40 h-40" />
          </motion.div>

          <motion.h2
            className="section-title font-bold text-blue-500 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Obrigado por visitar!
          </motion.h2>

          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "6rem", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full"></div>
          </motion.div>
        </div>

        {/* Farewell Message with enhanced styling */}
        <motion.div
          className="text text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="mb-4">Espero que tenha gostado do meu portfólio!</p>
          <p className="mb-4">
            Sinta-se à vontade para explorar mais, voltar ao início ou retornar sempre que desejar.
          </p>
          <p className="flex items-center justify-center gap-2">
            <span>Desejo muito sucesso nos seus projetos e na sua jornada!</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            >
              🚀
            </motion.span>
          </p>
        </motion.div>

        {/* Back to Top Button with enhanced styling */}
        <motion.button
          onClick={scrollToTop}
          className="group relative px-8 py-3 bg-transparent text-blue-400 border border-blue-500/50 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-300 rounded-full font-medium transition-all duration-300 flex items-center justify-center mx-auto overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
          whileTap={{ y: 0 }}
        >
          {/* Shine effect */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -skew-x-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></span>

          <ArrowUp className="w-5 h-5 mr-2" />
          <span className="relative z-10">Voltar para o Início</span>

          {/* Subtle glow effect on hover */}
          <motion.span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: "inset 0 0 20px rgba(59, 130, 246, 0.3)",
            }}
          />
        </motion.button>

        {/* Subtle decorative elements */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 opacity-30">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.3 }}
          >
            <Heart className="w-4 h-4 text-blue-400" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
          </motion.div>
        </div>
      </div>

      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient"></div>
    </section>
  )
}

export default End

