"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import Background from "./Background"

// Componente de bandeira 3D para a página de boas-vindas
const WelcomeFlag = ({
  country,
  language,
  isHighlighted = false,
  onClick,
}: {
  country: string
  language: string
  isHighlighted?: boolean
  onClick: () => void
}) => {
  const { t } = useTranslation()
  const flagPath = `/flags/${country}.svg`

  return (
    <motion.button
      className={`flex flex-col items-center gap-3 ${isHighlighted ? "scale-110" : ""}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden
                  ${isHighlighted ? "ring-4 ring-blue-500 ring-offset-4 ring-offset-gray-900" : ""}
                  shadow-lg hover:shadow-xl transition-all duration-300`}
        animate={
          isHighlighted
            ? {
                boxShadow: [
                  "0 0 15px rgba(59, 130, 246, 0.3)",
                  "0 0 25px rgba(59, 130, 246, 0.6)",
                  "0 0 15px rgba(59, 130, 246, 0.3)",
                ],
              }
            : {}
        }
        transition={
          isHighlighted
            ? {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }
            : {}
        }
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Efeito 3D com sombra e profundidade */}
        <div
          className="w-full h-full bg-cover bg-center transform transition-transform duration-500"
          style={{
            backgroundImage: `url(${flagPath})`,
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.4)",
          }}
        />

        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

        {/* Efeito de reflexo */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-40" />

        {/* Efeito de profundidade nas bordas */}
        <div className="absolute inset-0 border-2 border-black/10 rounded-xl" />
      </motion.div>

      <span className="text-lg font-medium text-white">{t(`welcome.languages.${language}`)}</span>
    </motion.button>
  )
}

// Componente para exibir texto de boas-vindas em um idioma específico
const WelcomeText = ({ language, title }: { language: string; title: string }) => {
  return (
    <motion.div
      className="text-center mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg sm:text-xl font-medium text-blue-400">{title}</h2>
      <p className="text-sm text-gray-400">{language}</p>
    </motion.div>
  )
}

const WelcomePage = () => {
  const { t, i18n } = useTranslation()
  const [detectedLanguage, setDetectedLanguage] = useState<string>("pt")
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Mapeamento de códigos de idioma para nomes de países para as bandeiras
  const languageToCountry: Record<string, string> = {
    pt: "brazil",
    en: "usa",
    es: "spain",
  }

  // Mapeamento de códigos de idioma para nomes de idiomas para a mensagem
  const languageToName: Record<string, string> = {
    pt: "Português",
    en: "English",
    es: "Español",
  }

  // Textos de boas-vindas em cada idioma
  const welcomeTexts = {
    pt: "Bem-vindo ao meu Portfólio",
    en: "Welcome to my Portfolio",
    es: "Bienvenido a mi Portafolio",
  }

  useEffect(() => {
    // Detectar o idioma do navegador
    const browserLanguage = navigator.language.split("-")[0]
    const supportedLanguage = ["pt", "en", "es"].includes(browserLanguage) ? browserLanguage : "pt"
    setDetectedLanguage(supportedLanguage)

    // Verificar se já existe uma preferência salva
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && ["pt", "en", "es"].includes(savedLanguage)) {
      setDetectedLanguage(savedLanguage)
    }

    // Simular um tempo de carregamento para efeito visual
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLanguageSelect = (language: string) => {
    // Salvar a preferência de idioma
    localStorage.setItem("language", language)
    i18n.changeLanguage(language)

    // Marcar que já visitou o site
    localStorage.setItem("hasVisitedBefore", "true")

    // Navegar para a página principal com o idioma selecionado
    navigate(`/${language}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background animado */}
      <div className="absolute inset-0">
        <Background />
      </div>

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center relative z-10"
          >
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl p-6 sm:p-8 rounded-2xl bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-xl relative z-10 mx-4"
          >
            <div className="text-center mb-8">
              {/* Textos de boas-vindas em todos os idiomas */}
              <motion.div
                className="flex flex-col gap-1 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <WelcomeText language="Português" title={welcomeTexts.pt} />
                <WelcomeText language="English" title={welcomeTexts.en} />
                <WelcomeText language="Español" title={welcomeTexts.es} />
              </motion.div>

              <motion.p
                className="text-lg text-gray-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                {t("welcome.subtitle")}
              </motion.p>

              <motion.div
                className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
              >
                {t("welcome.detected", { language: languageToName[detectedLanguage] })}
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              {Object.entries(languageToCountry).map(([lang, country]) => (
                <WelcomeFlag
                  key={lang}
                  country={country}
                  language={lang}
                  isHighlighted={lang === detectedLanguage}
                  onClick={() => handleLanguageSelect(lang)}
                />
              ))}
            </motion.div>

            {/* Decoração de cantos */}
            <div className="absolute top-3 left-3 w-16 h-16 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg"></div>
            <div className="absolute bottom-3 right-3 w-16 h-16 border-b-2 border-r-2 border-blue-500/30 rounded-br-lg"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WelcomePage
