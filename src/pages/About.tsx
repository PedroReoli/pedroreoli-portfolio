"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ChevronDown, MousePointer, Sparkles } from "lucide-react"
import { useTranslation } from "react-i18next"

const About = () => {
  const { t } = useTranslation()
  const [isHovering, setIsHovering] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()
  const imageControls = useAnimation()

  // Detectar se é um dispositivo móvel e ajustar o comportamento
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Animar quando a seção entrar na viewport
  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      // Adicionar um efeito sutil de "pulse" na imagem para chamar atenção
      if (!hasInteracted) {
        imageControls.start({
          scale: [1, 1.02, 1],
          transition: {
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: 2,
            repeatDelay: 1,
          },
        })
      }
    }
  }, [isInView, controls, imageControls, hasInteracted])

  // Função para alternar a imagem
  const handleImageInteraction = () => {
    setIsFlipped(!isFlipped)
    setHasInteracted(true)

    // Parar a animação de pulse após a primeira interação
    imageControls.stop()
  }

  // Variantes de animação para elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent overflow-hidden"
    >
      {/* Efeitos de fundo aprimorados */}
      <div className="absolute top-20 right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-blue-500/3 rounded-full blur-2xl"></div>

      {/* Partículas decorativas animadas */}
      <motion.div
        className="absolute top-1/4 right-1/3 w-1 h-1 bg-blue-400/30 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400/20 rounded-full"
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      {/* Container principal com animações */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Título da seção com efeitos refinados */}
        <motion.div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center" variants={itemVariants}>
          <div className="relative inline-block">
            <h1 className="section-title font-bold text-blue-500 relative z-10">
              {t("about.title")}
              <span className="text-white">;</span>
            </h1>

            {/* Efeito de destaque no título */}
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            {/* Efeito de brilho sutil */}
            <motion.div
              className="absolute -top-2 -left-4 text-blue-500/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              <Sparkles size={20} />
            </motion.div>
          </div>
        </motion.div>

        {/* Conteúdo principal com layout aprimorado */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Seção da imagem com interatividade aprimorada */}
          <motion.div
            className="w-full md:w-5/12 flex flex-col items-center md:sticky md:top-24"
            variants={itemVariants}
          >
            {/* Container da imagem com efeitos visuais aprimorados */}
            <motion.div
              className="relative w-full max-w-xs sm:max-w-sm rounded-xl overflow-hidden shadow-xl shadow-blue-500/10 group"
              animate={imageControls}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleImageInteraction}
              onMouseEnter={() => !isMobile && setIsHovering(true)}
              onMouseLeave={() => !isMobile && setIsHovering(false)}
              onKeyDown={(e) => e.key === "Enter" && handleImageInteraction()}
              tabIndex={0}
              role="button"
              aria-label={t("about.imageAlt")}
            >
              {/* Efeito de brilho no hover/tap */}
              <motion.div
                className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ opacity: isFlipped || isHovering ? 0.15 : 0 }}
              />

              {/* Container 3D para o efeito de flip */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden transform-gpu perspective-1000">
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: (isMobile && isFlipped) || (!isMobile && isHovering) ? 180 : 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.23, 1, 0.32, 1],
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Imagem em preto e branco */}
                  <div className="absolute inset-0 backface-hidden">
                    <img
                      src="/assets/perfilpb.jpg"
                      alt={t("about.imageAlt")}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40"></div>
                  </div>

                  {/* Imagem colorida */}
                  <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateY(180deg)" }}>
                    <img
                      src="/assets/perfilcol.jpg"
                      alt={t("about.imageAltColor")}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-20"></div>
                  </div>
                </motion.div>
              </div>

              {/* Elementos decorativos refinados */}
              <div className="absolute top-3 left-3 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-l-2 border-blue-500/70 opacity-70 rounded-tl-lg"></div>
              <div className="absolute bottom-3 right-3 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-r-2 border-blue-500/70 opacity-70 rounded-br-lg"></div>

              {/* Indicador de interação */}
              {!hasInteracted && (
                <motion.div
                  className="absolute bottom-4 right-4 text-blue-400/80"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  {isMobile ? <ChevronDown size={20} /> : <MousePointer size={20} />}
                </motion.div>
              )}
            </motion.div>

            {/* Texto abaixo da foto com instruções contextuais */}
            <motion.div
              className="text-center mt-3 sm:mt-4 text-gray-300 italic text-sm"
              variants={itemVariants}
              animate={{
                color:
                  (isMobile && isFlipped) || (!isMobile && isHovering) ? "rgb(59, 130, 246)" : "rgb(209, 213, 219)",
              }}
              transition={{ duration: 0.3 }}
            >
              {(isMobile && isFlipped) || (!isMobile && isHovering) ? (
                <span className="font-medium text-blue-500 flex items-center justify-center gap-1.5">
                  <Sparkles size={14} />
                  {t("about.hoverText")}
                  <Sparkles size={14} />
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  {isMobile ? (
                    <>
                      <ChevronDown size={14} className="animate-bounce" />
                      {t("about.clickText")}
                      <ChevronDown size={14} className="animate-bounce" />
                    </>
                  ) : (
                    <>
                      <MousePointer size={14} />
                      {t("about.hoverTextDesktop")}
                      <MousePointer size={14} />
                    </>
                  )}
                </span>
              )}
            </motion.div>
          </motion.div>

          {/* Seção de texto com design aprimorado */}
          <motion.div className="w-full md:w-7/12" variants={itemVariants}>
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800/50 p-5 sm:p-6 md:p-8 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/10 transition-all duration-500">
              <div className="relative">
                {/* Decoração de cantos aprimorada */}
                <div className="absolute -top-2 -left-2 w-8 h-8 sm:w-10 sm:h-10 border-t-2 border-l-2 border-blue-500/50 rounded-tl-lg"></div>

                {/* Título com design refinado */}
                <motion.h3
                  className="title text-gray-300 mb-4 sm:mb-6 pl-3 sm:pl-4 relative"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <span className="relative">
                    {t("about.subtitle")}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-blue-500/30"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </span>
                </motion.h3>

                {/* Parágrafos com animação sequencial */}
                <div className="space-y-4 sm:space-y-6 text-gray-300">
                  <motion.p className="text leading-relaxed" variants={itemVariants}>
                    {t("about.paragraph1")}
                  </motion.p>

                  <motion.p className="text leading-relaxed" variants={itemVariants}>
                    {t("about.paragraph2")}
                  </motion.p>

                  <motion.p className="text leading-relaxed" variants={itemVariants}>
                    {t("about.paragraph3")}
                  </motion.p>
                </div>

                {/* Decoração de cantos aprimorada */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-blue-500/50 rounded-br-lg"></div>
              </div>
            </div>

            {/* Elemento decorativo adicional */}
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient"></div>
    </section>
  )
}

export default About
