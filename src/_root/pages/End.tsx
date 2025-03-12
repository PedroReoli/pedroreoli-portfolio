"use client"

import { motion } from "framer-motion"

const End = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        {/* SVG Image */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-blue-500/50 p-1 flex items-center justify-center overflow-hidden bg-gray-900/50 shadow-lg shadow-blue-500/10">
            <img src="/assets/Eu.svg" alt="Ilustração" className="w-full h-full object-contain" />
            <div className="absolute inset-0 rounded-full border border-blue-500/20"></div>
          </div>
        </motion.div>

        {/* Thank You Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-blue-500 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Obrigado por visitar!
        </motion.h2>

        {/* Farewell Message */}
        <motion.div
          className="text-gray-300 text-lg md:text-xl mb-14 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="mb-4">Espero que tenha gostado do meu portfólio!</p>
          <p className="mb-4">
            Sinta-se à vontade para explorar mais, voltar ao início ou retornar sempre que desejar.
          </p>
          <p>Desejo muito sucesso nos seus projetos e na sua jornada! 🚀</p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="px-8 py-3 bg-transparent text-blue-400 border-2 border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300 rounded-full font-medium transition-colors duration-300 flex items-center justify-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)" }}
          whileTap={{ y: 0 }}
        >
          <svg
            className="w-5 h-5 mr-2 transform rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          Voltar para o Início
        </motion.button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient"></div>
    </section>
  )
}

export default End

