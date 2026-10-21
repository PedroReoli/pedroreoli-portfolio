import React from "react"
import { Link } from "react-router-dom"
import SEOHead from "../components/atoms/SEOHead"
import { ArrowLeft, Home } from "lucide-react"
import { useLanguage } from "../i18n/useLanguage"

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage()
  const isEn = language === "en"

  return (
    <div className="flex min-h-screen min-h-[100svh] min-h-[100dvh] flex-col bg-[#111010] text-[#edeae4] antialiased">
      <SEOHead
        title={
          isEn
            ? "404 — Page Not Found | Pedro Lucas Reis"
            : "404 — Página Não Encontrada | Pedro Lucas Reis"
        }
        description={
          isEn
            ? "The page you are looking for does not exist or has moved."
            : "A página que você está procurando não existe ou foi movida."
        }
        canonicalUrl="https://pedroreis.vercel.app/404"
        noIndex={true}
        locale={isEn ? "en_US" : "pt_BR"}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="editorial-container flex flex-1 flex-col justify-center pb-16 pt-32 focus:outline-none"
      >
        <span className="editorial-label mb-6 text-[#82aaff]">{isEn ? "ERROR" : "ERRO"} / 404</span>
        <h1 className="text-[clamp(4rem,14vw,12rem)] font-black leading-[0.78] tracking-[-0.08em] text-[#edeae4]">
          {isEn ? "OFF ROUTE" : "FORA DE ROTA"}
        </h1>
        <p className="mb-10 mt-8 max-w-md text-base text-[#8d8984]">
          {isEn
            ? "This address does not exist or may have moved. Check the URL or return home."
            : "Este endereço não existe ou pode ter sido movido. Verifique a URL ou retorne ao início."}
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border-b border-[#82aaff] pb-2 text-sm font-semibold uppercase tracking-[0.1em]"
          >
            <Home className="w-4 h-4" />
            <span>{isEn ? "Back home" : "Voltar ao início"}</span>
          </Link>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 border-b border-white/30 pb-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#aaa6a0]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEn ? "View projects" : "Ver projetos"}</span>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage
