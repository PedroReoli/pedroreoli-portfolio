"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const About = () => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section className="relative min-h-screen py-16 md:py-24 bg-transparent overflow-hidden">
      {/* "Sobre Mim" heading */}
      <motion.div
        className="relative z-10 container mx-auto px-4 mb-10 md:mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="section-title font-bold text-center text-blue-500">
          Sobre Mim<span className="text-white">;</span>
        </h1>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Interactive image section */}
          <motion.div
            className="w-full lg:w-5/12 flex flex-col items-center lg:sticky lg:top-24"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-2xl shadow-blue-500/10"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden transform-gpu perspective-1000">
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: isHovering ? 180 : 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.23, 1, 0.32, 1],
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Black and white image */}
                  <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                    <img src="/assets/perfilpb.jpg" alt="Pedro Lucas" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40"></div>
                  </div>

                  {/* Color image */}
                  <div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <img
                      src="/assets/perfilcol.jpg"
                      alt="Pedro Lucas Colorido"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-20"></div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-20 h-20 border-t-2 border-l-2 border-blue-500 opacity-70"></div>
              <div className="absolute bottom-4 right-4 w-20 h-20 border-b-2 border-r-2 border-blue-500 opacity-70"></div>
            </div>

            {/* Text below photo */}
            <motion.div
              className="text-center mt-4 text-gray-300 italic"
              animate={{
                opacity: 1,
                color: isHovering ? "rgb(59, 130, 246)" : "rgb(209, 213, 219)",
              }}
              transition={{ duration: 0.3 }}
            >
              {isHovering ? (
                <span className="font-medium text-blue-500">Chique demais 😎</span>
              ) : (
                <span>(passe o mouse na foto)</span>
              )}
            </motion.div>
          </motion.div>

          {/* Text content section with card design */}
          <motion.div
            className="w-full lg:w-7/12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800/50 p-6 md:p-8 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-500">
              <div className="relative">
                {/* Decorative corner accent */}
                <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-blue-500/50 rounded-tl-lg"></div>

                <h3 className="title text-gray-300 mb-6 pl-4">Desenvolvedor • Músico • Escritor</h3>

                <div className="space-y-6 text-gray-300">
                  <p className="text leading-relaxed">
                    Sou um <span className="text-blue-500 font-medium">desenvolvedor FullStack Júnior</span> movido por{" "}
                    <span className="text-blue-500 font-medium">curiosidade</span>,{" "}
                    <span className="text-blue-500 font-medium">inovação</span> e um olhar{" "}
                    <span className="text-blue-500 font-medium">criativo</span>. A tecnologia, para mim, vai além do
                    código — é uma ponte entre <span className="text-blue-500 font-medium">acessibilidade</span>,{" "}
                    <span className="text-blue-500 font-medium">arquitetura limpa</span> e impacto real.
                  </p>

                  <p className="text leading-relaxed">
                    Como <span className="text-blue-500 font-medium">músico</span> e{" "}
                    <span className="text-blue-500 font-medium">educador</span>, trago a sensibilidade da arte para a
                    forma como construo soluções. Acredito que tecnologia e{" "}
                    <span className="text-blue-500 font-medium">criatividade</span> andam juntas, e que cada projeto
                    deve acolher, transformar e expandir possibilidades com um{" "}
                    <span className="text-blue-500 font-medium">tato humano</span> que vá além da lógica.
                  </p>

                  <p className="text leading-relaxed">
                    Busco <span className="text-blue-500 font-medium">evolução contínua</span> e impacto real. No
                    futuro, quero unir <span className="text-blue-500 font-medium">educação</span> e{" "}
                    <span className="text-blue-500 font-medium">empreendedorismo</span>, criando uma{" "}
                    <span className="text-blue-500 font-medium">startup</span> que amplie{" "}
                    <span className="text-blue-500 font-medium">inclusão digital</span> e torne a tecnologia acessível
                    para mais pessoas.
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-blue-500/50 rounded-br-lg"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient"></div>
    </section>
  )
}

export default About

