"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, FileText, Youtube, Instagram, Twitter } from "lucide-react"
import { useTranslation } from "react-i18next"

// Ícones modernos do Lucide
const socialLinks = [
  { href: "mailto:pedrosousa2160@gmail.com", icon: <Mail strokeWidth={1.5} />, label: "Email" },
  { href: "https://github.com/PedroReoli", icon: <Github strokeWidth={1.5} />, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/pedro-lucas-reis-de-oliveira-sousa-a93945171/",
    icon: <Linkedin strokeWidth={1.5} />,
    label: "LinkedIn",
  },
  { href: "https://www.devemdesenvolvimento.com.br/", icon: <FileText strokeWidth={1.5} />, label: "Blog" },
  { href: "https://www.youtube.com/@DevDesenvolvimento", icon: <Youtube strokeWidth={1.5} />, label: "YouTube" },
  {
    href: "https://www.instagram.com/01_dev_em_desenvolvimento",
    icon: <Instagram strokeWidth={1.5} />,
    label: "Instagram",
  },
  { href: "https://x.com/opedroreoli", icon: <Twitter strokeWidth={1.5} />, label: "Twitter" },
]

const Home = () => {
  const { t } = useTranslation()
  const [typedText, setTypedText] = useState("")
  const fullText = t("home.greeting")

  // Efeito de digitação
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [fullText])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden">
      {/* Efeitos de fundo sutis */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center justify-center">
          {/* Seção de texto com design minimalista */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Saudação com efeito de digitação */}
            <motion.div
              className="overflow-hidden mb-2"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-white font-light text-lg">
                <span>{typedText}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2 }}
                  className="inline-block ml-1 w-0.5 h-5 bg-blue-500 align-middle"
                  style={{ display: typedText.length < fullText.length ? "inline-block" : "none" }}
                />
              </h1>
            </motion.div>

            {/* Nome com tamanho moderado e animação elegante */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500 mb-3 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, type: "spring", stiffness: 100 }}
            >
              Pedro
            </motion.h2>

            {/* Título profissional com design clean */}
            <motion.h3
              className="text-gray-300 text-lg font-light tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
            >
              {t("home.role")}
            </motion.h3>
          </motion.div>

          {/* Links sociais com design moderno */}
          <motion.div
            className="grid grid-cols-4 md:grid-cols-7 gap-5 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                {/* Ícone com efeito hover moderno */}
                <div className="relative mb-2">
                  {/* Círculo de fundo com efeito de brilho no hover */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 group-hover:border-blue-500/50 transition-all duration-300">
                    <span className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                      {link.icon}
                    </span>
                  </div>

                  {/* Efeito de brilho no hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                    }}
                  />
                </div>

                {/* Label minimalista */}
                <span className="text-xs text-gray-500 group-hover:text-blue-400 transition-colors duration-300">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Home
