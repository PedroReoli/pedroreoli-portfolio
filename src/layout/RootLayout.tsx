"use client"

import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "@/components/LanguageSwitcher"

const RootLayout = () => {
  const { lang } = useParams<{ lang: string }>()
  const { i18n } = useTranslation()

  // Atualizar o idioma com base na URL
  useEffect(() => {
    if (lang && ["pt", "en", "es"].includes(lang)) {
      i18n.changeLanguage(lang)
    }
  }, [lang, i18n])

  return (
    <div className="min-h-screen">
      {/* Botão de troca de idioma no canto superior direito */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Conteúdo principal */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
