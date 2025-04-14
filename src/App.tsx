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
  const [hasVisitedBefore, setHasVisitedBefore] = useState(false)

  // Verificar se já visitou antes
  useEffect(() => {
    const visited = localStorage.getItem("hasVisitedBefore")
    setHasVisitedBefore(!!visited)

    // Se estamos em uma URL com idioma, não mostrar a página de boas-vindas
    const pathSegments = window.location.pathname.split("/").filter(Boolean)
    if (pathSegments.length > 0 && ["pt", "en", "es"].includes(pathSegments[0])) {
      i18n.changeLanguage(pathSegments[0])
      localStorage.setItem("language", pathSegments[0])
    }
  }, [i18n])

  return (
    <div className="relative overflow-x-hidden w-full">
      <Router>
        <Routes>
          {/* Rota raiz - mostrar WelcomePage ou redirecionar */}
          <Route
            path="/"
            element={
              hasVisitedBefore ? <Navigate to={`/${localStorage.getItem("language") || "pt"}`} /> : <WelcomePage />
            }
          />

          {/* Rota para WelcomePage explícita */}
          <Route path="/welcome" element={<WelcomePage />} />

          {/* Rotas específicas de idioma */}
          <Route path="/:lang" element={<RootLayout />}>
            <Route index element={<MainPage />} />
          </Route>

          {/* Redirecionar qualquer outra rota para a raiz */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
