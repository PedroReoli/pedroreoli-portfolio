"use client"

import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import RootLayout from "@/layout/RootLayout"
import MainPage from "@/pages/MainPage"
import WelcomePage from "@/pages/WelcomePage"
import "./i18n/i18n" // Importar configuração do i18n

const App = () => {
  const { i18n } = useTranslation()
  const [showWelcome, setShowWelcome] = useState(true)
  const [hasLanguagePreference, setHasLanguagePreference] = useState(false)

  // Verificar se já existe uma preferência de idioma salva
  useEffect(() => {
    const savedLanguage = localStorage.getItem("i18nextLng")
    if (savedLanguage) {
      setHasLanguagePreference(true)

      // Se estamos na raiz e temos uma preferência, redirecionar para a URL com idioma
      if (window.location.pathname === "/") {
        const lang = savedLanguage.split("-")[0]
        if (["pt", "en", "es"].includes(lang)) {
          window.location.href = `/${lang}`
          return
        }
      }
    }

    // Se estamos em uma URL com idioma, não mostrar a página de boas-vindas
    const pathSegments = window.location.pathname.split("/").filter(Boolean)
    if (pathSegments.length > 0 && ["pt", "en", "es"].includes(pathSegments[0])) {
      setShowWelcome(false)
      i18n.changeLanguage(pathSegments[0])
    }
  }, [i18n])

  return (
    <div className="relative overflow-x-hidden w-full">
      <Router>
        {showWelcome && <WelcomePage />}
        <Routes>
          <Route
            path="/"
            element={hasLanguagePreference ? <Navigate to={`/${i18n.language.split("-")[0]}`} /> : null}
          />
          <Route path="/:lang" element={<RootLayout />}>
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
