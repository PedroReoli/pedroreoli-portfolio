import React from "react"
import { Link } from "react-router-dom"
import SEOHead from "../components/atoms/SEOHead"
import StitchHeader from "../components/organisms/StitchHeader"
import { ArrowLeft, Home } from "lucide-react"

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#111010] text-[#edeae4] antialiased">
      <SEOHead
        title="404 — Página Não Encontrada | Pedro Lucas Reis"
        description="A página que você está procurando não existe ou foi movida."
        canonicalUrl="https://pedroreis.vercel.app/404"
        noIndex={true}
      />
      <StitchHeader />

      <main className="editorial-container flex flex-1 flex-col justify-center pb-16 pt-32">
        <span className="editorial-label mb-6 text-[#82aaff]">ERRO / 404</span>
        <h1 className="text-[clamp(4rem,14vw,12rem)] font-black leading-[0.78] tracking-[-0.08em] text-[#edeae4]">
          FORA DE ROTA
        </h1>
        <p className="mb-10 mt-8 max-w-md text-base text-[#8d8984]">
          O link que você tentou acessar não existe ou pode ter sido movido. Verifique o endereço ou retorne à página inicial.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 border-b border-[#82aaff] pb-2 text-sm font-semibold uppercase tracking-[0.1em]"
          >
            <Home className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </Link>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 border-b border-white/30 pb-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#aaa6a0]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ver Projetos</span>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage
