"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from "framer-motion"
import Background from "./Background"
import { Globe } from "lucide-react"

// Substituir o componente Flag3D por uma versão mais responsiva
const Flag3D = ({
  country,
  languageName,
  isSelected = false,
  onClick,
}: {
  country: string
  languageName: string
  isSelected?: boolean
  onClick: () => void
}) => {
  const controls = useAnimation()
  const flagRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10])
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10])
  const flagPath = `/flags/${country}.png`

  // Efeito de destaque para a bandeira selecionada
  useEffect(() => {
    if (isSelected) {
      controls.start({
        scale: 1,
        boxShadow: "0 0 30px 5px rgba(59, 130, 246, 0.4)",
        borderColor: "rgba(59, 130, 246, 0.8)",
      })
    } else {
      controls.start({
        scale: 0.95,
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
        borderColor: "rgba(255, 255, 255, 0.1)",
      })
    }
  }, [isSelected, controls])

  // Função para atualizar a rotação 3D baseada na posição do mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (flagRef.current) {
      const rect = flagRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        ref={flagRef}
        className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-500"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
          borderColor: isSelected ? "rgba(59, 130, 246, 0.8)" : "rgba(255, 255, 255, 0.1)",
        }}
        animate={controls}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0)
          mouseY.set(0)
        }}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Bandeira com efeito 3D */}
        <img
          src={flagPath || "/placeholder.svg"}
          alt={`Bandeira ${languageName}`}
          className="absolute inset-0 w-full h-full object-cover z-10"
        />

        {/* Efeito de brilho no hover */}
        <motion.div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

        {/* Efeito de reflexo */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-white/30 to-transparent opacity-40" />
      </motion.div>

      {/* Nome do idioma com efeito de destaque */}
      <motion.div
        className="text-center mt-2 sm:mt-4"
        animate={{
          color: isSelected ? "#60A5FA" : "#E5E7EB",
          textShadow: isSelected ? "0 0 10px rgba(96, 165, 250, 0.5)" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-sm sm:text-base md:text-lg font-medium">{languageName}</h3>
      </motion.div>
    </motion.div>
  )
}

// Atualizar o componente WelcomePage para melhorar a responsividade
const WelcomePage = () => {
  const { t, i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Mapeamento de códigos de idioma para nomes de países para as bandeiras
  const languageToCountry: Record<string, string> = {
    pt: "brazil",
    en: "usa",
    es: "spain",
  }

  // Mapeamento de códigos de idioma para nomes de idiomas
  const languageToName: Record<string, string> = {
    pt: "Português",
    en: "English",
    es: "Español",
  }

  useEffect(() => {
    // Detectar o idioma do navegador
    const browserLanguage = navigator.language.split("-")[0]
    const supportedLanguage = ["pt", "en", "es"].includes(browserLanguage) ? browserLanguage : "pt"
    setSelectedLanguage(supportedLanguage)

    // Verificar se já existe uma preferência salva
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && ["pt", "en", "es"].includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage)
    }

    // Simular um tempo de carregamento curto para efeito visual
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)

    // Pequeno atraso para mostrar a seleção antes de navegar
    setTimeout(() => {
      // Salvar a preferência de idioma
      localStorage.setItem("language", language)
      i18n.changeLanguage(language)

      // Marcar que já visitou o site
      localStorage.setItem("hasVisitedBefore", "true")

      // Navegar para a página principal com o idioma selecionado
      navigate(`/${language}`)
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background animado */}
      <div className="absolute inset-0">
        <Background />
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center relative z-10"
          >
            {/* Loader minimalista */}
            <motion.div
              className="w-16 h-16 border-2 border-blue-500/20 border-t-blue-500 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full max-w-4xl mx-4 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Card principal com efeito de vidro premium */}
            <motion.div
              className="rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Gradiente de fundo do card */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 z-0" />

              {/* Efeito de brilho no topo */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/80 to-blue-500/0" />

              <div className="relative z-10 p-4 xs:p-6 sm:p-8 md:p-12">
                {/* Cabeçalho com título elegante */}
                <div className="flex flex-col items-center mb-6 sm:mb-8 md:mb-12">
                  <motion.div
                    className="mb-4 sm:mb-6 p-2 sm:p-3 rounded-full bg-blue-500/10 border border-blue-500/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-400" />
                  </motion.div>

                  <motion.h1
                    className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                  >
                    {t("welcome.title")}
                  </motion.h1>

                  <motion.div
                    className="h-0.5 w-16 sm:w-20 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-3 sm:mb-6"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "5rem", opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />

                  <motion.p
                    className="text-sm sm:text-base md:text-lg text-gray-300 max-w-lg text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                  >
                    {t("welcome.subtitle")}
                  </motion.p>
                </div>

                {/* Seleção de bandeiras */}
                <motion.div
                  className="flex flex-row justify-center gap-4 xs:gap-6 sm:gap-8 md:gap-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                >
                  {Object.entries(languageToCountry).map(([lang]) => (
                    <Flag3D
                      key={lang}
                      country={languageToCountry[lang]}
                      languageName={languageToName[lang]}
                      isSelected={selectedLanguage === lang}
                      onClick={() => handleLanguageSelect(lang)}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Decoração de cantos flutuantes - Ajustados para serem responsivos */}
            <motion.div
              className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 md:-top-4 md:-left-4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-blue-500/30 rounded-tl-3xl"
              initial={{ opacity: 0, x: -10, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 md:-bottom-4 md:-right-4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-blue-500/30 rounded-br-3xl"
              initial={{ opacity: 0, x: 10, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WelcomePage
