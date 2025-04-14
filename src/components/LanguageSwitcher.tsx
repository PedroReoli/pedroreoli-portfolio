"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { changeLanguage, getCurrentLanguage } from "../i18n/i18n"

// Componente de bandeira 3D
const Flag3D = ({
  country,
  isActive = false,
  onClick,
}: { country: string; isActive?: boolean; onClick?: () => void }) => {
  const flagPath = `/flags/${country}.png`

  return (
    <motion.div
      className={`relative w-8 h-8 rounded-full overflow-hidden cursor-pointer transform transition-all duration-300
                ${isActive ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900" : ""}
                hover:scale-110`}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Efeito 3D com sombra e brilho */}
      <div className="absolute inset-0 rounded-full shadow-inner" />

      <div
        className="w-full h-full bg-cover bg-center transform transition-transform duration-300 hover:scale-105"
        style={{
          backgroundImage: `url(${flagPath})`,
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
        }}
      />

      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Efeito de reflexo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-30" />
    </motion.div>
  )
}

const LanguageSwitcher = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const currentLanguage = getCurrentLanguage()

  // Mapeamento de códigos de idioma para nomes de países para as bandeiras
  const languageToCountry: Record<string, string> = {
    pt: "brazil",
    en: "usa",
    es: "spain",
  }

  // Mapeamento de códigos de idioma para nomes de idiomas
  const languageNames: Record<string, string> = {
    pt: t("welcome.languages.pt"),
    en: t("welcome.languages.en"),
    es: t("welcome.languages.es"),
  }

  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleLanguageChange = (language: string) => {
    changeLanguage(language)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative z-50">
      <motion.button
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800/70 backdrop-blur-md border border-gray-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
        onClick={toggleDropdown}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label={t("languageSwitcher.label")}
      >
        <Flag3D country={languageToCountry[currentLanguage]} isActive={true} />
        <span className="text-sm text-gray-200">{languageNames[currentLanguage]}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 py-2 w-48 bg-gray-800/80 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-lg shadow-black/20"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {Object.keys(languageToCountry).map((lang) => (
              <motion.button
                key={lang}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm hover:bg-blue-500/10 transition-colors
                          ${currentLanguage === lang ? "text-blue-400" : "text-gray-200"}`}
                onClick={() => handleLanguageChange(lang)}
                whileHover={{ x: 5 }}
              >
                <Flag3D country={languageToCountry[lang]} isActive={currentLanguage === lang} />
                <span>{languageNames[lang]}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher
