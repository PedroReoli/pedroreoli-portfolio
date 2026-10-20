import React from "react"
import { Link } from "react-router-dom"
import SEOHead from "../components/atoms/SEOHead"
import StitchHeader from "../components/organisms/StitchHeader"
import { ArrowLeft, Home } from "lucide-react"

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] font-body text-[#f0f6fc] antialiased flex flex-col">
      <SEOHead
        title="404 — Página Não Encontrada | Pedro Lucas Reis"
        description="A página que você está procurando não existe ou foi movida."
        canonicalUrl="https://pedroreis.vercel.app/404"
        noIndex={true}
      />
      <StitchHeader />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-16 max-w-2xl mx-auto">
        <span className="font-mono text-sm text-[#58a6ff] bg-[#161b22] px-3 py-1 rounded-md border border-[#30363d] mb-4">
          ERRO 404
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f0f6fc] mb-3">
          Página não encontrada
        </h1>
        <p className="text-[#8b949e] text-base mb-8 max-w-md">
          O link que você tentou acessar não existe ou pode ter sido movido. Verifique o endereço ou retorne à página inicial.
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-sm transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </Link>
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white font-medium text-sm transition-colors border border-[#30363d]"
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
