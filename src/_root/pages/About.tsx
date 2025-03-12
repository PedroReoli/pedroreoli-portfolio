"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const About = () => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section className="relative min-h-screen bg-gray-900 py-16 md:py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-900 opacity-50"></div>

      {/* "Sobre Mim" heading */}
      <motion.div
        className="relative z-10 container mx-auto px-4 mb-10 md:mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-500">
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

          {/* Text content section */}
          <motion.div
            className="w-full lg:w-7/12 text-white lg:pt-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-blue-500">Pedro Lucas</h2>
            <h3 className="text-xl text-gray-300 mb-6">Desenvolvedor FullStack • Músico • Escritor • Criativo</h3>

            <div className="space-y-5 text-gray-300">
              <p className="leading-relaxed text-base md:text-lg">
                Sou Pedro Lucas, um desenvolvedor FullStack Júnior movido por{" "}
                <span className="text-blue-500 font-medium">curiosidade, inovação e um olhar criativo</span>. Minha
                experiência vai além do código — a música, a escrita e o ensino moldam minha abordagem, trazendo{" "}
                <span className="text-blue-500 font-medium">sensibilidade e profundidade</span> para cada projeto que
                crio.
              </p>

              <p className="leading-relaxed text-base md:text-lg">
                Acredito que tecnologia e criatividade <span className="text-blue-500 font-medium">andam juntas</span>.
                Meu diferencial é transformar{" "}
                <span className="text-blue-500 font-medium">ideias abstratas em soluções escaláveis</span>, aplicando{" "}
                <span className="text-blue-500 font-medium">boas práticas de desenvolvimento</span> e um design
                intuitivo que impacta vidas.
              </p>

              <p className="leading-relaxed text-base md:text-lg">
                Com uma mentalidade voltada para o aprendizado contínuo, busco sempre{" "}
                <span className="text-blue-500 font-medium">evoluir e criar</span> produtos modernos, otimizados e
                eficientes. Seja desenvolvendo{" "}
                <span className="text-blue-500 font-medium">aplicações performáticas</span>, escrevendo artigos ou
                explorando novas tecnologias, meu objetivo é entregar valor e inovação em cada linha de código.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
    </section>
  )
}

export default About

